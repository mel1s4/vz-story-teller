import { useState, useEffect, useRef } from 'react'
import './App.css'
import api from './api.js';
import SeasonsNavigation from './components/SeasonsNavigation.jsx';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0); // selected index for navigation
  const [mode, setMode] = useState(0); // 0: move, 1: write
  const [script, setScript] = useState([{
    title: "Title",
    type: "title",
    content: ""
  }, {
    title: "Subtitle",
    type: "subtitle",
    content: ""
  }, {
    title: "Slug Line",
    type: "slug",
    content: ""
  }, {
    title: "Action",
    type: "action",
    content: ""
  }, {
    title: "Character",
    type: "character",
    content: ""
  }, {
    title: "Dialogue",
    type: "dialogue",
    content: ""
  }]);
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
  const writingTypes = [
    {
      title: "Title",
      type: "title",
    },
    {
      title: "Subtitle",
      type: "subtitle",
    },
    {
      title: "Slug Line",
      type: "slug",
    },
    {
      title: "Action",
      type: "action",
    },
    {
      title: "Character",
      type: "character",
    },
    {
      title: "Dialogue",
      type: "dialogue",
    }
  ];

  const handleShortcuts = (event) => {
    const currentElement = script[selectedIndex];
    console.log("Key pressed:", event);
    // If the user presses 'Enter', insert a new element after the current one
    if (event.key === 'Enter' && event.shiftKey) {
      // do nothing, allow multiline input
      return;
    }
    if (event.key === 'Enter' && event.altKey) {
      insertElementAfter(selectedIndex, currentElement.type);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key
      if (currentElement) {
        insertElementAfter(selectedIndex, currentElement.type, true);
      }
      return;
    }
    if (event.key === 'Backspace' && script[selectedIndex].content === "") {
      // If backspace is pressed and the content is empty, remove the element
      if (selectedIndex > 0) {
        setScript(prevScript => {
          const updatedScript = [...prevScript];
          updatedScript.splice(selectedIndex, 1);
          return updatedScript;
        });
        selectScriptElement(selectedIndex - 1);
      }
      return;
    }
    // if alt + p is pressed, change type to next type
    if (event.altKey && event.key === 'p') {
      event.preventDefault(); // Prevent default behavior
      changeSelectedElementType();
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShortcuts);

    return () => {
      window.removeEventListener('keydown', handleShortcuts);
    };
  }, [script, selectedIndex, mode]);

  function selectedElement() {
    return script[selectedIndex];
  }

  function SceneNumber(index) {
    let count = 0;
    for (let i = 0; i < script.length; i++) {
      if (script[i].type === "slug") {
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
    const textarea = document.querySelectorAll('.edit-area')[selectedIndex];
    if (textarea) {
      textarea.focus();
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [selectedIndex]);

  function nextTypeOf(eName) {
    switch (eName) {
      case "title":
        return "subtitle";
      case "subtitle":
        return "slug";
      case "slug":
        return "action";
      case "action":
        return "character";
      case "character":
        return "dialogue";
      case "dialogue":
        return "title"; // Loop back to slug after dialogue
      default:
        return "title"; // Default case, should not happen
    }
    return "title";
  }

  function insertElementAfter(index, otype, toggle = false) {
    if (index == script.length - 1) {
      console.log("Inserting new element at the end of the script");
    }
    let type = otype;
    if (toggle) {
      type = nextTypeOf(otype);
    }
    const newElement = {
      title: "",
      type,
      content: ""
    };
    console.log("Inserting new element after index:", index, "of type:", type);
    if (index < 0 || index >= script.length) {
      console.error("Index out of bounds for script array");
      return;
    }
    setScript(prevScript => {
      const updatedScript = [...prevScript];
      updatedScript.splice(index + 1, 0, newElement);
      return updatedScript;
    });
    setSelectedIndex(index + 1);
  }

  function selectScriptElement(index) {
    setSelectedIndex(index);
  }

  function editAreaOnChange(e, element, index) {
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

  function changeSelectedElementType(type = null) {
    const newElement = selectedElement();
    if (!type) {
      const currentType = newElement.type;
      newElement.type = nextTypeOf(currentType);
    } else {
      newElement.type = type;
    }
    setScript(prevScript => {
      const updatedScript = [...prevScript];
      updatedScript[selectedIndex] = newElement;
      return updatedScript;
    });

  }

  function typeIsSelected(type) {
    return selectedElement().type === type;
  }


  return (
    <main className="script-writer">
      <section className="story-navigation">
        <SeasonsNavigation seasons={exampledata.seasons} />
        <div className="element-indicators">
          <ul className="elements-list">
            {writingTypes.map((type, index) => (
              <li
                key={index}
                className={`element-item ${typeIsSelected(type.type) ? '--active' : ''}`}
                onClick={() => changeSelectedElementType(type.type)}
              >
                {type.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="script">
        {script.map((element, index) => (
          <div key={index}
            onFocus={() => selectScriptElement(index)}
            className={element.type}>
            {element.type === "slug" && (
              <div className="slug-index">
                <p className="slugIdx --left">
                  {SceneNumber(index)}
                </p>
                <p className="slugIdx --right">
                  {SceneNumber(index)}
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
      </section>
    </main>
  )
}

export default App
