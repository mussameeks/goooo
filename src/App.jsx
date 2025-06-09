import React, { useEffect, useState } from "react";

function App() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Use Vercel proxy endpoint
    const url = "/api/fixtures";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setFixtures(data.response || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching fixtures: " + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "40px auto" }}>
      <h1>Football Fixtures</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {fixtures.map((fixture) => (
          <li key={fixture.fixture?.id} style={{ marginBottom: 12 }}>
            <b>{fixture.teams?.home?.name} vs {fixture.teams?.away?.name}</b><br />
            {fixture.league?.name} - {fixture.fixture?.date?.slice(0, 10)}<br />
            Score: {fixture.goals?.home} - {fixture.goals?.away}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
