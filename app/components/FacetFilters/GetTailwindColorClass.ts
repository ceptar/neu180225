const validColors = [
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime',
    'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
    'fuchsia', 'pink', 'rose'
  ];

export function getTailwindColorClass(color: string): string {
    validColors.includes(color);
  
    const normalizedColor = color.toLowerCase();
    if (validColors.includes(normalizedColor)) {
      return `bg-${normalizedColor}-500`;
    }
    return 'bg-gray-200'; // Default color if not found
  }

  export function getTailwindColorClassFill(color: string): string {
    validColors.includes(color);
  
    const normalizedColor = color.toLowerCase();
    if (validColors.includes(normalizedColor)) {
      return `fill-${normalizedColor}-500`;
    }
    return 'fill-discogray'; // Default color if not found
  }

