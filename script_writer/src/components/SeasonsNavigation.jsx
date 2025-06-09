import { React, useState } from 'react';

function SeasonsNavigation({ seasons, onSeasonChange }) {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    onSeasonChange(season);
  };

  return (
    <ul className="seasons">
      {seasons.map((season, index) => (
        <li key={index} className="season-item">
          <button onClick={() => toggleNav('season', index)}>{season.title}</button>
          <ul className="episodes">
            {season.episodes.map((episode, epIndex) => (
              <li key={epIndex} className="episode-item">
                <button onClick={() => toggleNav('episode', epIndex)}>{episode.title}</button>
                <ul className="scenes">
                  {episode.scenes.map((scene, sceneIndex) => (
                    <li key={sceneIndex} className="scene-item">
                      <button onClick={() => selectScene(sceneIndex)}>{scene.title}</button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default SeasonsNavigation;
