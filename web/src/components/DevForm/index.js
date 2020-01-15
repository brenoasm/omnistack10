import React, { useState, useEffect, useCallback } from "react";

const DevForm = ({ onSubmit }) => {
  const [techs, setTechs] = useState("");
  const [github_username, setGitHubUsername] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log("ERROR===", error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    await onSubmit({
      github_username: github_username,
      latitude,
      longitude,
      techs
    });

    setGitHubUsername("");
    setTechs("");
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          valu={github_username}
          onChange={e => setGitHubUsername(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Técnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            id="latitude"
            required
            value={latitude}
            type="number"
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            id="longitude"
            required
            value={longitude}
            type="number"
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default DevForm;
