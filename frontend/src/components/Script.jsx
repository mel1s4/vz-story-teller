import React, { useState } from 'react';
import ScriptItem from './ScriptItem.jsx';
import SelectionMenu from './SelectionMenu.jsx';
import Icon from './Icon.jsx';
import { useScript } from '../context/ScriptContext.jsx';
import './Script.scss';

const Script = () => {
  const { script, reorderScript, addScriptItem, selectedItems } = useScript();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const hasSelection = selectedItems.length > 0;

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    // Only update the visual indicator, don't reorder yet
    setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderScript(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };



  return (
    <>
      <SelectionMenu />
      <div className={`script ${hasSelection ? 'script--drawer-open' : ''}`}>
        {script.map((item, index) => (
          <ScriptItem
            key={item.id}
            id={item.id}
            index={index}
            value={item.value}
            type={item.type}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            isDragging={draggedIndex === index}
            isDragOver={dragOverIndex === index}
          />
        ))}
        <button
          className="script__add-button"
          onClick={() => addScriptItem('action')}
          title="Add Item">
          <Icon name="plus" size="lg" />
        </button>
      </div>
    </>
  );
};

export default Script;


