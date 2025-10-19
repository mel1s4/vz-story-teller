import React, { useEffect, useRef, useState } from 'react';
import { useScript } from '../context/ScriptContext.jsx';
import Icon from './Icon.jsx';
import './ScriptItem.scss';
import ItemTypeSelector from './itemTypeSelector.jsx';

const ScriptItem = (
  {
    id,
    index,
    value,
    type,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    isDragging,
    isDragOver,
  }
) => {
  const {
    updateScriptItem,
    removeScriptItem,
    setCurrentlyEditing,
    setCurrentlyEditingId,
    currentlyEditing,
    toggleSelection,
    isSelected,
    getSceneNumber,
    resizeTextarea,
  } = useScript();

  const isEditing = currentlyEditing === id;
  const selected = isSelected(id);
  const sceneNumber = getSceneNumber(id);
  const textareaRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  // Sync localValue with value prop when item changes
  useEffect(() => {
    setLocalValue(value);
    // Set initial height to match content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Auto-save on blur
  const handleBlur = () => {
    if (localValue !== value) {
      updateScriptItem(id, { value: localValue });
    }
  };

  function setType(type) {
    updateScriptItem(id, { type });
    setCurrentlyEditingId(id);
  }

  function deleteItem() {
    removeScriptItem(id);
  }

  const types = [
    'header', // Episode/scene title
    'subtitle', // Episode/scene subtitle
    'slugline', // Scene header
    'action', // Scene description and action lines
    'character', // Character name
    'dialog', // Character dialogue
  ];

  // Get placeholder text based on item type
  const getPlaceholder = (type) => {
    switch (type) {
      case 'header':
        return 'EPISODE TITLE';
      case 'subtitle':
        return 'Episode subtitle or description';
      case 'slugline':
        return 'INT. WELL LIT HOUSE. - DAY';
      case 'action':
        return 'John walks across the room and picks up the phone.';
      case 'character':
        return 'JOHN';
      case 'dialog':
        return 'What are you doing here?';
      default:
        return 'Enter text...';
    }
  };

  const [isGrabbing, setIsGrabbing] = useState(false);

  return <div
    className={`script-item --${type.toLowerCase()} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''} ${selected ? 'selected' : ''}`}
    draggable={isGrabbing ? 'true' : 'false'} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} onDragEnd={onDragEnd}>
    <div className="script-item__content">
      <div className="script-item__actions-wrapper">
        <span className="drag-handle" onMouseEnter={() => setIsGrabbing(true)} onMouseLeave={() => setIsGrabbing(false)}>
          <Icon name="grip-vertical" size="sm" />
        </span>
        <label className="script-item__label">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleSelection(id)}
          />
        </label>
        <button
          className="script-item__delete script-item__button"
          title="Delete"
          onClick={deleteItem}>
          <Icon name="circle-xmark" size="sm" className="script-item__icon" />
        </button>
      </div>
      <section className="script-item__content-wrapper">
        <textarea
          ref={textareaRef}
          value={localValue}
          data-id={id}
          onChange={(e) => {
            setLocalValue(e.target.value);
            resizeTextarea(id);
          }}
          onBlur={handleBlur}
          onFocus={() => setCurrentlyEditingId(id)}
          className="script-item__input script-item__value"
          placeholder={getPlaceholder(type)}
          spellCheck={false}
          rows={1}
        />
        <ItemTypeSelector types={types} type={type} setType={setType} />
        {type === 'slugline' && sceneNumber && (
          <div className="script-item__slugline-numbers">
            <span className="script-item__scene-number --left">{sceneNumber}</span>
            <span className="script-item__scene-number --right">{sceneNumber}</span>
          </div>
        )}
      </section>
    </div>

  </div >
};



export default ScriptItem;

