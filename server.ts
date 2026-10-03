import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Cache generated audio in memory for high-speed playback
const audioCache = new Map<string, { audioContent: string; format: string }>();

/**
 * Route: POST /api/tts
 * Synthesizes natural Indonesian speech using Google Cloud Text-to-Speech API
 * specifically tailored for Indonesian middle school (SMP) teacher and student roles.
 */
app.post('/api/tts', async (req, res) => {
  try {
    const { text, speaker, speed = 1.0 } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Parameter text diperlukan' });
    }

    // Clean text to ensure only dialog content is synthesized (no prompt instruction leakage)
    const cleanText = text.replace(/^(\[.*?\]|bicaralah.*?:)\s*/i, '').trim();

    const speakerRole = speaker === 'guru' ? 'guru' : 'siswa';
    const cacheKey = `${speakerRole}_${speed}_${cleanText}`;

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return res.json({
        audioContent: cached.audioContent,
        format: cached.format,
        cached: true,
        speaker: speakerRole,
      });
    }

    // 1. Try Google Cloud Text-to-Speech API (id-ID Neural2 & Wavenet voices)
    if (apiKey) {
      try {
        const isGuru = speakerRole === 'guru';

        // Select authentic Indonesian voice
        // Guru: Male mature educator (id-ID-Neural2-B or id-ID-Wavenet-B)
        // Siswa: Youthful teenage voice (id-ID-Neural2-A or id-ID-Wavenet-C)
        const voiceName = isGuru ? 'id-ID-Neural2-B' : 'id-ID-Neural2-A';
        const ssmlGender = isGuru ? 'MALE' : 'FEMALE';
        const speakingRate = isGuru ? Math.max(0.7, Math.min(1.4, 0.95 * speed)) : Math.max(0.7, Math.min(1.4, 1.05 * speed));
        const pitch = isGuru ? -1.5 : 2.5; // Guru lower calm pitch, Siswa higher youthful pitch

        const gcloudTtsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

        const gcloudResponse = await fetch(gcloudTtsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: cleanText },
            voice: {
              languageCode: 'id-ID',
              name: voiceName,
              ssmlGender,
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate,
              pitch,
              effectsProfileId: ['small-bluetooth-speaker-class-device'],
            },
          }),
        });

        if (gcloudResponse.ok) {
          const data = (await gcloudResponse.json()) as { audioContent?: string };
          if (data.audioContent) {
            audioCache.set(cacheKey, { audioContent: data.audioContent, format: 'mp3' });
            return res.json({
              audioContent: data.audioContent,
              format: 'mp3',
              provider: 'google-cloud-tts',
              voice: voiceName,
              speaker: speakerRole,
            });
          }
        } else {
          const errText = await gcloudResponse.text();
          console.warn('Google Cloud TTS returned non-200:', gcloudResponse.status, errText);

          // Retry with Standard voice in case Neural2 is restricted
          const fallbackVoice = isGuru ? 'id-ID-Standard-B' : 'id-ID-Standard-A';
          const retryResponse = await fetch(gcloudTtsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text },
              voice: {
                languageCode: 'id-ID',
                name: fallbackVoice,
                ssmlGender,
              },
              audioConfig: {
                audioEncoding: 'MP3',
                speakingRate,
                pitch,
              },
            }),
          });

          if (retryResponse.ok) {
            const data = (await retryResponse.json()) as { audioContent?: string };
            if (data.audioContent) {
              audioCache.set(cacheKey, { audioContent: data.audioContent, format: 'mp3' });
              return res.json({
                audioContent: data.audioContent,
                format: 'mp3',
                provider: 'google-cloud-tts-standard',
                voice: fallbackVoice,
                speaker: speakerRole,
              });
            }
          }
        }
      } catch (err) {
        console.warn('Google Cloud TTS fetch error:', err);
      }
    }

    // 2. Try Gemini TTS model (gemini-3.8-flash-lite-tts)
    if (ai) {
      try {
        const isGuru = speakerRole === 'guru';
        const voiceName = isGuru ? 'Fenrir' : 'Kore';

        const ttsResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: cleanText,
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          audioCache.set(cacheKey, { audioContent: base64Audio, format: 'wav' });
          return res.json({
            audioContent: base64Audio,
            format: 'wav',
            provider: 'gemini-tts',
            speaker: speakerRole,
          });
        }
      } catch (err) {
        console.warn('Gemini TTS error:', err);
      }
    }

    return res.status(503).json({
      error: 'Layanan TTS tidak tersedia saat ini. Periksa API key atau koneksi.',
    });
  } catch (error: unknown) {
    console.error('TTS endpoint error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: msg });
  }
});

// Start Express server and mount Vite
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`Server Belajar Sesuai Gaya Kamu berjalan di http://localhost:${port}`);
  });
}

startServer();
