import express from 'express';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

const app = express();
const PROXY_URL = 'http://zunrrpft-US-rotate:2826o444egna@p.webshare.io:80';

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl?.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const agent = new HttpsProxyAgent(PROXY_URL);
    const response = await axios.get(targetUrl, {
      httpsAgent: agent,
      headers: { 'User-Agent': 'Mozilla/5.0 Chrome/122.0.0.0' },
      responseType: 'text'
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000);
