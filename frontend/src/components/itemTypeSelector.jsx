import React from 'react';
import Icon from './Icon.jsx';
import './itemTypeSelector.scss';

const ItemTypeSelector = ({ types, type, setType }) => {

  const itemTypeIcons = {
    'header': 'heading',
    'subtitle': 'quote-left',
    'slugline': 'chess',
    'action': 'align-left',
    'parenthetical': 'italic',
    'character': 'user',
    'dialog': 'comment',
    'transition': 'arrow-right',
    'pagebreak': 'file-lines',
  }

  return (
    <div className="script-item__select">
      <section className="current-type">
        <Icon name={itemTypeIcons[type]} size="sm" />
      </section>
      <ul className="type-list">
        {types.map((type) => (
          <li key={type} className="type-list__item">
            <button className="type-list__button"
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              onClick={() => setType(type)}>
              <Icon name={itemTypeIcons[type]} size="sm" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )


  return (
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="script-item__select">
      {types.map((type) => (
        <option key={type} value={type} className="script-item__option">{type}</option>
      ))}
    </select>
  )
}

export default ItemTypeSelector;
