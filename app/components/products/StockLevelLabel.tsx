export type StockLevel = 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';

export function StockLevelLabel({ stockLevel }: { stockLevel?: string }) {
  let stockLevelLabel = '';
  let badgeClasses = 'bg-discogray-100 text-discogray-800';
  switch (stockLevel as StockLevel) {
    case 'IN_STOCK':
      stockLevelLabel = 'In stock';
      badgeClasses = 'bg-discoteal-100 text-discoteal-800';
      break;
    case 'OUT_OF_STOCK':
      stockLevelLabel = 'Out of stock';
      badgeClasses = 'bg-discored-100 text-discored-800';
      break;
    case 'LOW_STOCK':
      stockLevelLabel = 'Low stock';
      badgeClasses = 'bg-discoyellow-100 text-discoyellow-800';
      break;
  }
  return (
    <span
      className={
        'inline-flex items-center px-2 py-0.5 text-xs  ' +
        badgeClasses
      }
    >
      {stockLevelLabel}
    </span>
  );
}
