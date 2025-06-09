export default async function handler(req, res) {
  // Forward query params if needed, e.g. ?date=2024-06-09
  const params = req.url.split('?')[1] ? `?${req.url.split('?')[1]}` : '';
  const url = `https://v3.football.api-sports.io/fixtures${params}`;

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": process.env.APISPORTS_KEY || "ad421a8289a3eb425aab97578a8cf214",
    },
  });

  const data = await response.json();

  // Set CORS header for browser (optional, Vercel already allows from same origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
