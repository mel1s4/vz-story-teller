# Styles Guide

This directory contains shared SCSS variables and mixins for consistent styling across the application.

## File Structure

```
styles/
├── _variables.scss  # Design tokens (colors, spacing, sizes)
├── _mixins.scss     # Reusable style patterns
└── README.md        # This file
```

## Usage

Import mixins in your component SCSS files:

```scss
@import '../styles/mixins';

.my-component {
  padding: $spacing-md;
  color: $color-primary;

  button {
    @include button;
  }
}
```

## Variables

### Colors
- `$color-primary` - Main brand color (#2196F3)
- `$color-primary-dark` - Darker variant (#1976D2)
- `$color-danger` - Error/delete actions (#f44336)
- `$color-danger-dark` - Darker danger variant (#d32f2f)
- `$color-border` - Standard border color (#e0e0e0)
- `$color-background-light` - Light backgrounds (#f5f5f5)
- `$color-white` - White (#fff)

### Spacing
- `$spacing-xs` - 8px
- `$spacing-sm` - 10px
- `$spacing-md` - 12px
- `$spacing-lg` - 16px
- `$spacing-xl` - 20px
- `$spacing-2xl` - 30px

### Typography
- `$font-size-xs` - 13px
- `$font-size-sm` - 14px
- `$font-size-base` - 1rem
- `$font-size-lg` - 1.25rem
- `$font-size-xl` - 1.5rem
- `$font-size-2xl` - 2rem

### Other
- `$border-radius-sm` - 4px
- `$transition-fast` - 0.2s ease
- `$shadow-sm` - Small drop shadow
- `$shadow-md` - Medium drop shadow

## Mixins

### Button
```scss
@include button($bg-color, $hover-color);
// Creates a styled button with hover effects
```

### Input Field
```scss
@include input-field;
// Applies standard input styling with focus states
```

### Select Field
```scss
@include select-field;
// Applies standard select dropdown styling
```

### Layout Helpers
```scss
@include flex-center;      // Centers content with flexbox
@include flex-between;     // Space between with flexbox
@include absolute($top, $right, $bottom, $left);  // Absolute positioning
```

### Effects
```scss
@include hover-lift;       // Adds lift effect on hover
@include hidden-on-idle;   // Hidden until hover
@include slide-down-animation;  // Slide down entrance
@include word-wrap;        // Proper text wrapping
```

### Other
```scss
@include list-reset;       // Removes list styling
```

## Best Practices

1. **Always use variables** instead of hardcoded values
2. **Use mixins** for repeated patterns
3. **Import once** - Only import mixins (which includes variables)
4. **Extend, don't duplicate** - Create new mixins if you find repeated patterns
5. **Keep it semantic** - Use meaningful variable names

## Adding New Variables

When adding variables, follow this pattern:
```scss
// Group related variables
// Use descriptive names with prefixes
$component-property-variant: value;

// Examples:
$color-primary: #2196F3;
$spacing-md: 12px;
$font-size-base: 1rem;
```

## Adding New Mixins

When creating mixins:
```scss
@mixin mixin-name($param: default-value) {
  // Styles here
}
```

Keep mixins focused on a single responsibility.



