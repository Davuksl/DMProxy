import express from "express";
import fetch from "cross-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const USERNAME = "zunrrpft-US-rotate";
const PASSWORD = "2826o444egna";
const AUTH_HEADER = "Basic " + Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64");

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing url param");

  try {
    const proxyRes = await fetch(targetUrl, {
      headers: {
        "Proxy-Authorization": AUTH_HEADER
      },
      agent: new (await import("http-proxy-agent")).default(`http://${USERNAME}:${PASSWORD}@p.webshare.io:80`)
    });

    const html = await proxyRes.text();
    res.send(html);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy server running on port " + PORT));
