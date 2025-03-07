import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  try {
    const string = await kv.get(id);
    if (string) {
      return res.status(200).json({ string });
    } else {
      return res.status(404).json({ error: 'String not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve string' });
  }
}
