import { React, useState } from 'react';

function ScriptNavigation({ script, onSelect }) {
  // const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  const handleSeasonChange = (script) => {
    setSelectedSeason(season);
    onSelect(season);
  };

  return (
    <ul className="seasons">
      {script.seasons.map((season, index) => (
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

export default ScriptNavigation;
