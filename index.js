/**
 * AXIOM — API proxy.
 *
 * The browser never sees the Anthropic key. The React client posts a
 * conversation to /api/chat; this server attaches the system prompt and the
 * credential, forwards to the Messages API, and returns the reply text.
 */

import express from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-6';
const PROMPT_VERSION = 'axiom.v1.md';

if (!API_KEY) {
  console.error(
    'Missing ANTHROPIC_API_KEY. Copy .env.example to .env and add your key.'
  );
  process.exit(1);
}

// Load the versioned prompt from disk at startup.
const SYSTEM_PROMPT = readFileSync(
  join(__dirname, '..', 'prompts', PROMPT_VERSION),
  'utf-8'
);

const app = express();
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Send a non-empty messages array.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Anthropic API error:', response.status, detail);
      return res
        .status(response.status)
        .json({ error: 'The model could not be reached. Try again.' });
    }

    const data = await response.json();

    // Content is an array of blocks; concatenate the text ones.
    const text = data.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    res.json({ text });
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'The model could not be reached. Try again.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: MODEL, prompt: PROMPT_VERSION });
});

app.listen(PORT, () => {
  console.log(`AXIOM proxy listening on :${PORT} — prompt ${PROMPT_VERSION}`);
});
