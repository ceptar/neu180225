import { getTailwindColorClass } from './GetTailwindColorClass';
import { ColorSwatchesProps } from '~/app/providers/interfaces';

export function generateGradient({ colors }: ColorSwatchesProps) {
  const getColorValue = (color) => {
    const tailwindClass = getTailwindColorClass(color.name);
    // Convert Tailwind classes to actual color values
    const colorMap = {
      'bg-slate-500': '#64748b',
      'bg-gray-500': '#6b7280',
      'bg-zinc-500': '#71717a',
      'bg-neutral-500': '#737373',
      'bg-stone-500': '#78716c',
      'bg-red-500': '#ef4444',
      'bg-orange-500': '#f97316',
      'bg-amber-500': '#f59e0b',
      'bg-yellow-500': '#eab308',
      'bg-lime-500': '#84cc16',
      'bg-green-500': '#22c55e',
      'bg-emerald-500': '#10b981',
      'bg-teal-500': '#14b8a6',
      'bg-cyan-500': '#06b6d4',
      'bg-sky-500': '#0ea5e9',
      'bg-blue-500': '#3b82f6',
      'bg-indigo-500': '#6366f1',
      'bg-violet-500': '#8b5cf6',
      'bg-purple-500': '#a855f7',
      'bg-fuchsia-500': '#d946ef',
      'bg-pink-500': '#ec4899',
      'bg-rose-500': '#f43f5e'
    };
    return colorMap[tailwindClass] || tailwindClass.replace('bg-', '');
  };

  if (colors.length === 0) return 'linear-gradient(45deg, gray-200, gray-200)';
  if (colors.length === 1) return `linear-gradient(45deg, ${getColorValue(colors[0])}, white)`;
  if (colors.length === 2) return `linear-gradient(45deg, ${getColorValue(colors[0])}, ${getColorValue(colors[1])})`;
  
  const colorStops = colors.map((color, index) => 
    `${getColorValue(color)} ${index * (100 / (colors.length - 1))}%`
  );
  
  return `linear-gradient(45deg, ${colorStops.join(', ')})`;
}