const express = require('express');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const app = express();

const PROXY_URL = 'http://zunrrpft-US-rotate:2826o444egna@p.webshare.io:80';

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Missing or invalid URL' });
  }

  try {
    const agent = new HttpsProxyAgent(PROXY_URL);
    const response = await axios.get(targetUrl, { httpsAgent: agent });
    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
