import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [weIndex, setWeIndex] = useState(0); // writing element index
  const [mode, setMode] = useState(0); // 0: move, 1: write
  const [txtarea, setTextarea] = useState('');
  const [script, setScript] = useState([]);
  const exampledata = {
    seasons: [
      {
        title: "Season 1",
        id: 1,
        episodes: [
          {
            title: "Episode 1",
            id: 1,
            scenes: [
              {
                title: "Scene 1",
                id: 1,
                content: [
                  {
                    type: "slug",
                    content: "EXT. PARK - DAY"
                  },
                  {
                    type: "action",
                    content: "A group of friends are sitting on a bench."
                  },
                  {
                    type: "character",
                    content: "JOHN"
                  },
                  {
                    type: "dialogue",
                    content: "It's a beautiful day, isn't it?"
                  },
                  {
                    type: "character",
                    content: "SARAH"
                  },
                  {
                    type: "dialogue",
                    content: "Yes, it really is!"
                  }
                ]
              },
              {
                title: "Scene 2",
                id: 2,
                content: [
                  {
                    type: "slug",
                    content: "INT. COFFEE SHOP - DAY"
                  },
                  {
                    type: "action",
                    content: "The friends enter the coffee shop."
                  },
                  {
                    type: "character",
                    content: "JOHN"
                  },
                  {
                    type: "dialogue",
                    content: "Let's grab some coffee."
                  }
                ]
              },
              {
                title: "Scene 3",
                id: 3,
                content: [
                  {
                    type: "slug",
                    content: "EXT. PARK - DAY"
                  },
                  {
                    type: "action",
                    content: "They sit back down on the bench."
                  },
                  {
                    type: "character",
                    content: "SARAH"
                  },
                  {
                    type: "dialogue",
                    content: "This is the life!"
                  }
                ]
              }
            ]
          },
          {
            title: "Episode 2",
            id: 2,
            scenes: [
              {
                title: "Scene 1",
                id: 1,
                content: [
                  {
                    type: "slug",
                    content: "EXT. BEACH - DAY"
                  },
                  {
                    type: "action",
                    content: "The friends are walking along the beach."
                  },
                  {
                    type: "character",
                    content: "JOHN"
                  },
                  {
                    type: "dialogue",
                    content: "I love the sound of the waves."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Season 2",
        id: 2,
        episodes: [
          {
            title: "Episode 1",
            id: 1,
            scenes: [
              {
                title: "Scene 1",
                id: 1,
                content: [
                  {
                    type: "slug",
                    content: "INT. LIBRARY - DAY"
                  },
                  {
                    type: "action",
                    content: "The friends are studying in the library."
                  },
                  {
                    type: "character",
                    content: "JOHN"
                  },
                  {
                    type: "dialogue",
                    content: "I can't believe how much there is to learn."
                  },
                  {
                    type: "character",
                    content: "SARAH"
                  },
                  {
                    type: "dialogue",
                    content: "I know, right? It's overwhelming!"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  const writingElements = [
    {
      title: "Title",
      name: "title",
    },
    {
      title: "Subtitle",
      name: "subtitle",
    },
    {
      title: "Slug Line",
      name: "slug",
    },
    {
      title: "Action",
      name: "action",
    },
    {
      title: "Character",
      name: "character",
    },
    {
      title: "Dialogue",
      name: "dialogue",
    }
  ];

  function textareaOnChange(e) {
    const value = e.target.value;
    setTextarea(value);
    if (e.nativeEvent.inputType === "insertLineBreak") {
      //if current element is title, subtitle or slug, select the next writing element
      const ifThisSelectNext = ["title", "subtitle", "slug", "character"];
      if (ifThisSelectNext.includes(selectedWE().name)) {
        selectNextWe();
      }

      saveElement();
    }
  }

  function clearTextarea() {
    setTextarea('');
  }

  function saveElement() {
    console.log(txtarea, "ex")
    const newElement = {
      title: selectedWE().title,
      name: selectedWE().name,
      content: txtarea
    };

    setScript(prevDocument => {
      const nDocument = [...prevDocument, newElement];
      console.log(nDocument);
      return nDocument;
    });

    // Clear the textarea after saving
    clearTextarea();
  }

  function selectPrevWe() {
    if (weIndex > 0) {
      setWeIndex(weIndex - 1);
    } else {
      let idx = writingElements.length - 1;
      setWeIndex(idx);
    }
  }

  function selectNextWe() {
    // console.log("selectNextWe", weIndex, writingElements.length);
    if (weIndex < writingElements.length - 1) {
      // console.log("incrementing weIndex");
      setWeIndex(weIndex + 1);
    } else {
      setWeIndex(0);
    }
  }

  const handleShortcuts = (event) => {
    if (document.activeElement === textareaRef.current) {
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        if (selectedWE().name === "dialogue") {
          setWeIndex(3); // Switch to Action
        } else {
          selectNextWe();
        }
      }
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault();
        selectPrevWe();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShortcuts);

    return () => {
      window.removeEventListener('keydown', handleShortcuts);
    };
  }, [weIndex, mode]);

  const selectedWE = () => {
    return writingElements[weIndex];
  }

  function totalSlugs(index) {
    let count = 0;
    for (let i = 0; i < script.length; i++) {
      if (script[i].name === "slug") {
        count++;
      }
      if (i === index) {
        break;
      }
    }
    return count;
  }
  // Auto-resize textarea
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [txtarea, weIndex]);

  function toggleNav(type, index) {
    console.log(`Toggling ${type} navigation at index ${index}`);
    const navItems = document.querySelectorAll(`.${type}-item`);
    navItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.toggle('--active');
      } else {
        item.classList.remove('--active');
      }
    });

  }

  function selectScene(sceneIndex) {
    console.log(`Selecting scene at index ${sceneIndex}`);
  }

  function editAreaOnChange(e, element, index) {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      textareaRef.current.focus();
      return;
    }
    const newContent = e.target.value;
    setScript(prevScript => {
      const updatedScript = [...prevScript];
      updatedScript[index] = {
        ...updatedScript[index],
        content: newContent
      };
      return updatedScript;
    });
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    console.log(e.target.scrollHeight, "scrollHeight");
  }

  return (
    <main className="script-writer">
      <section className="story-navigation">
        <ul className="seasons">
          {exampledata.seasons.map((season, index) => (
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
        <div className="element-indicators">
          <ul className="elements-list">
            {writingElements.map((element, index) => (
              <li
                key={index}
                className={`element-item ${weIndex === index ? '--active' : ''}`}
                onClick={() => setWeIndex(index)}
              >
                {element.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="script">
        {script.map((element, index) => (
          <div key={index} className={element.name}>
            {element.name === "slug" && (
              <div className="slug-index">
                <p className="slugIdx --left">
                  {totalSlugs(index)}
                </p>
                <p className="slugIdx --right">
                  {totalSlugs(index)}
                </p>
              </div>
            )}
            <textarea className="content edit-area"
              value={element.content}
              onChange={(e) => editAreaOnChange(e, element, index)}
              rows="1"
              onLoad={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            ></textarea>
          </div>
        ))}
        <div className={selectedWE().name + " --placeholder"}>
          {selectedWE().name === "slug" && (
            <div className="slug-index">
              <p className="slugIdx --left">
                {totalSlugs(script.length) + 1}
              </p>
              <p className="slugIdx --right">
                {totalSlugs(script.length) + 1}
              </p>
            </div>
          )}
          <textarea
            id="warea"
            ref={textareaRef}
            value={txtarea}
            className="content"
            onChange={textareaOnChange}
            rows="1"
          ></textarea>
        </div>
      </section>
    </main>
  )
}

export default App
