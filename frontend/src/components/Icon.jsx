import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

/**
 * Icon component using Font Awesome CSS classes
 *
 * @example
 * <Icon name="heading" size="sm" />
 * <Icon name="plus" size="lg" className="my-icon" />
 */
const Icon = ({ name, size = 'sm', className = '', ...props }) => {
  const iconClass = toFontAwesomeClass(name);
  const sizeClass = getSizeClass(size);

  function toFontAwesomeClass(name) {
    // heading -> fa-heading
    return 'fa-' + name;
  }

  function getSizeClass(size) {
    const sizeMap = {
      'xs': 'fa-xs',
      'sm': 'fa-sm',
      'lg': 'fa-lg',
      'xl': 'fa-xl',
      '2x': 'fa-2x',
      '3x': 'fa-3x',
      '4x': 'fa-4x',
      '5x': 'fa-5x',
      '6x': 'fa-6x',
      '7x': 'fa-7x',
      '8x': 'fa-8x',
      '9x': 'fa-9x',
      '10x': 'fa-10x'
    };
    return sizeMap[size] || 'fa-sm';
  }

  return (
    <i
      className={`fas ${iconClass} ${sizeClass} ${className}`.trim()}
      {...props}
    />
  );
};

export default Icon;

