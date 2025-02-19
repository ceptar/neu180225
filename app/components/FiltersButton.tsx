import  Filter  from '~/app/components/svgs/Filter';

export function FiltersButton({
  filterCount,
  onClick,
}: {
  filterCount: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex items-center p-2 sm:ml-6 text-discogray hover:text-discogray-400 justify-center rounded-full bg-discopink-200 border-discogray"
      onClick={onClick}
    >
      {filterCount ? (
        <span className="inline-flex items-center px-2.5 rounded-full text-xs font-medium bg-primary-200 text-primary-800">
          {filterCount}
        </span>
      ) : (
        ''
      )}

      <Filter className="fill-discogray relative mx-auto" width={32} height={32} />
    </button>
  );
}
