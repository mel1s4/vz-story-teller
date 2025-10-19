import React, { createContext, useState, useEffect, useContext } from 'react';
import { useKeyboardShortcuts } from '../helpers/useKeyboardShortcuts';
import api from '../helpers/api';

const ScriptContext = createContext();

export const useScript = () => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error('useScript must be used within a ScriptProvider');
  }
  return context;
};

export const ScriptProvider = ({ children }) => {
  const [script, setScript] = useState([]);
  const [initialScript, setInitialScript] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentlyEditing, setCurrentlyEditingId] = useState(null);

  // Undo/Redo state management
  const [history, setHistory] = useState({
    past: [],
    present: [],
    future: []
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [initialState, setInitialState] = useState([]);

  function setCurrentlyEditing(id) {
    // set the item that has focus and is a textarea of an item in the script
    setCurrentlyEditingId(id);
    const textarea = document.querySelector(`[data-id="${id}"]`);
    if (textarea) {
      textarea.focus();
      // position pointer at the end of the textarea
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      // scroll to the textarea
      textarea.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Save a snapshot of the current state for undo/redo
  const saveSnapshot = (currentScript) => {
    const snapshot = JSON.parse(JSON.stringify(currentScript)); // Deep clone
    setHistory(prev => {
      const newHistoryIndex = prev.past.length;
      return {
        past: [...prev.past, prev.present],
        present: snapshot,
        future: [] // Clear future when making new changes
      };
    });
    setHistoryIndex(prev => prev + 1);
  };

  // Undo function
  const undo = () => {
    setHistory(prev => {
      // Prevent undoing beyond the initial state
      if (prev.past.length === 0) {
        return prev;
      }

      const previousState = prev.past[prev.past.length - 1];
      setScript(previousState);

      return {
        past: prev.past.slice(0, -1),
        present: previousState,
        future: [prev.present, ...prev.future]
      };
    });
    setHistoryIndex(prev => Math.max(0, prev - 1));
  };

  // Redo function
  const redo = () => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;
      const nextState = prev.future[0];
      setScript(nextState);
      return {
        past: [...prev.past, prev.present],
        present: nextState,
        future: prev.future.slice(1)
      };
    });
    setHistoryIndex(prev => prev + 1);
  };

  // Load script from localStorage on mount and initialize history
  useEffect(() => {
    const savedScript = api.getScript();
    let initialScript = [];
    if (savedScript) {
      try {
        // Check if savedScript is already an object/array or a JSON string
        if (typeof savedScript === 'string') {
          initialScript = JSON.parse(savedScript);
        } else {
          // It's already a JavaScript object/array
          initialScript = savedScript;
        }
      } catch (error) {
        console.error('Error parsing saved script:', error);
        initialScript = [];
      }
    }
    setScript(initialScript);
    setInitialScript(initialScript);
    setInitialState(JSON.parse(JSON.stringify(initialScript)));
    // Initialize history with the loaded script as the initial state
    setHistory({
      past: [],
      present: JSON.parse(JSON.stringify(initialScript)),
      future: []
    });
    setHistoryIndex(0);
  }, []);

  useEffect(() => {
    if (JSON.stringify(script) !== JSON.stringify(initialScript)) {
      console.log('script has changed, saving to API');
      api.saveScript(script);
    }
  }, [script]);

  // Add a new item to the script
  const addScriptItem = (type) => {
    const id = window.crypto.randomUUID();
    setScript((prevScript) => {
      const newScript = [...prevScript, { id, value: '', type }];
      saveSnapshot(newScript);
      return newScript;
    });
    setTimeout(() => {
      setCurrentlyEditing(id);
    }, 10);
  };

  // Insert a new item after a specific item
  const insertScriptItemAfter = (afterId, type) => {
    const newId = window.crypto.randomUUID();
    setScript((prevScript) => {
      const index = prevScript.findIndex(item => item.id === afterId);
      let newScript;
      if (index === -1) {
        // If item not found, append to end
        newScript = [...prevScript, { id: newId, value: '', type }];
      } else {
        // Insert after the specified item
        newScript = [...prevScript];
        newScript.splice(index + 1, 0, { id: newId, value: '', type });
      }
      saveSnapshot(newScript);
      return newScript;
    });
    setTimeout(() => {
      setCurrentlyEditing(newId);
    }, 10);
  };

  // Update an existing script item
  const updateScriptItem = (id, updates) => {
    setScript((prevScript) => {
      const newScript = prevScript.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      saveSnapshot(newScript);
      return newScript;
    });
  };

  // Remove a script item
  const removeScriptItem = (id) => {
    setScript((prevScript) => {
      const newScript = prevScript.filter((item) => item.id !== id);
      saveSnapshot(newScript);
      return newScript;
    });
  };

  // Clear the entire script
  const clearScript = () => {
    const emptyScript = [];
    saveSnapshot(emptyScript);
    setScript(emptyScript);
    window.localStorage.removeItem('script');
  };

  // Reorder script items (for drag and drop)
  const reorderScript = (fromIndex, toIndex) => {
    setScript((prevScript) => {
      const newScript = [...prevScript];
      const [movedItem] = newScript.splice(fromIndex, 1);
      newScript.splice(toIndex, 0, movedItem);
      saveSnapshot(newScript);
      return newScript;
    });
  };

  // Selection functions
  const toggleSelection = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAll = () => {
    setSelectedItems(script.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const deleteSelected = () => {
    setScript((prevScript) => {
      const newScript = prevScript.filter(item => !selectedItems.includes(item.id));
      saveSnapshot(newScript);
      return newScript;
    });
    setSelectedItems([]);
  };

  const isSelected = (id) => {
    return selectedItems.includes(id);
  };

  // Calculate scene number for a given item
  const getSceneNumber = (itemId) => {
    const itemIndex = script.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return null;

    // Count sluglines from the beginning, reset on header or subtitle
    return script.slice(0, itemIndex + 1).reduce((sceneNumber, item) => {
      // Reset counter on header or subtitle
      if (item.type === 'header' || item.type === 'subtitle') {
        return 0;
      }
      // Increment counter on slugline
      if (item.type === 'slugline') {
        return sceneNumber + 1;
      }
      return sceneNumber;
    }, 0);
  };

  // Item types in order
  const itemTypes = ['header', 'subtitle', 'slugline', 'action', 'character', 'parenthetical', 'dialog'];
  const itemTypesIcons = {
    'header': 'heading-1',
    'subtitle': 'heading-2',
    'slugline': 'castle',
    'action': 'scan-text',
    'character': 'user',
    'parenthetical': 'comment-dots',
    'dialog': 'message-circle-more',
  };
  // Keyboard shortcuts - only active when editing
  const shortcuts = {
    'Ctrl+z': (e) => {
      e.preventDefault();
      undo();
    },
    'Ctrl+Z': (e) => {
      e.preventDefault();
      undo();
    },
    'Ctrl+y': (e) => {
      e.preventDefault();
      redo();
    },
    'Ctrl+Y': (e) => {
      e.preventDefault();
      redo();
    },
    'Ctrl+Shift+z': (e) => {
      e.preventDefault();
      redo();
    },
    'Ctrl+Shift+Z': (e) => {
      e.preventDefault();
      redo();
    },
    'Shift+Backspace': () => {
      if (currentlyEditing && script.find(item => item.id === currentlyEditing).value === '') {
        removeScriptItem(currentlyEditing);
        const index = script.findIndex(item => item.id === currentlyEditing);
        if (index > 0) {
          setCurrentlyEditing(script[index - 1].id);
        }
        if (index < script.length - 1) {
          setCurrentlyEditing(script[index + 1].id);
        }
      }
    },
    'Tab': (e) => {
      e.preventDefault();
      if (currentlyEditing) {
        // cycle through the next item type
        const currentType = script.find(item => item.id === currentlyEditing).type;
        const currentTypeIndex = itemTypes.findIndex(type => type === currentType);
        const nextTypeIndex = (currentTypeIndex + 1) % itemTypes.length;
        const nextType = itemTypes[nextTypeIndex];
        if (nextType) {
          updateScriptItem(currentlyEditing, { type: nextType });
          setTimeout(() => {
            resizeTextarea(currentlyEditing);
          }, 10);
        }
      }
    },
    'Shift+Tab': (e) => {
      e.preventDefault();
      if (currentlyEditing) {
        // cycle through the previous item type
        const currentType = script.find(item => item.id === currentlyEditing).type;
        const currentTypeIndex = itemTypes.findIndex(type => type === currentType);
        const previousTypeIndex = (currentTypeIndex - 1 + itemTypes.length) % itemTypes.length;
        const previousType = itemTypes[previousTypeIndex];
        if (previousType) {
          updateScriptItem(currentlyEditing, { type: previousType });
          setTimeout(() => {
            resizeTextarea(currentlyEditing);
          }, 10);
        }
      }
    },
    'Enter': (e) => {
      if (currentlyEditing) {
        e.preventDefault();
        const currentItem = script.find(item => item.id === currentlyEditing);
        if (currentItem) {
          insertScriptItemAfter(currentlyEditing, currentItem.type);
        }
      }
    },
    'Shift+Enter': () => {
    },
    'Shift+ArrowDown': () => {
      if (currentlyEditing) {
        const currentIndex = script.findIndex(item => item.id === currentlyEditing);
        if (currentIndex < script.length - 1) {
          setCurrentlyEditing(script[currentIndex + 1].id);
        }
      }
    },
    'Shift+ArrowUp': () => {
      if (currentlyEditing) {
        const currentIndex = script.findIndex(item => item.id === currentlyEditing);
        if (currentIndex > 0) {
          setCurrentlyEditing(script[currentIndex - 1].id);
        }
      }
    },
    'ArrowDown': (e) => {
    },
    'ArrowUp': (e) => {
    },
  };

  // Enable shortcuts only when editing
  useKeyboardShortcuts(shortcuts, true);

  const resizeTextarea = (id) => {
    const textarea = document.querySelector(`[data-id="${id}"]`);
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const onWindowResize = () => {
    console.log('window resized');
    script.forEach(item => {
      resizeTextarea(item.id);
    });
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const value = {
    script,
    setScript,
    addScriptItem,
    insertScriptItemAfter,
    updateScriptItem,
    removeScriptItem,
    clearScript,
    reorderScript,
    setCurrentlyEditingId,
    setCurrentlyEditing,
    currentlyEditing,
    getSceneNumber,
    shortcuts,
    selectedItems,
    toggleSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isSelected,
    itemTypesIcons,
    undo,
    redo,
    resizeTextarea,
  };

  return (
    <ScriptContext.Provider value={value}>
      {children}
    </ScriptContext.Provider>
  );
};

export default ScriptContext;

