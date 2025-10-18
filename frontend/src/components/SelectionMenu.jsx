import React from 'react';
import { useScript } from '../context/ScriptContext.jsx';
import Icon from './Icon.jsx';
import './SelectionMenu.scss';

const SelectionMenu = () => {
  const { selectedItems, clearSelection, deleteSelected, selectAll, script } = useScript();

  if (selectedItems.length === 0) return null;

  return (
    <div className="selection-menu">
      <div className="selection-menu__content">
        <span className="selection-menu__count">
          <Icon name="square-check" size="sm" />
          {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
        </span>
        <div className="selection-menu__actions">
          {selectedItems.length < script.length && (
            <button onClick={selectAll}>
              <Icon name="square-check" size="sm" />
              <span>Select All</span>
            </button>
          )}
          <button onClick={clearSelection}>
            <Icon name="xmark" size="sm" />
            <span>Clear</span>
          </button>
          <button onClick={deleteSelected} className="danger">
            <Icon name="trash" size="sm" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionMenu;

