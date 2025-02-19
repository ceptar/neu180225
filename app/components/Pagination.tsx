import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Select } from '~/app/components/Select';
import { Button } from '~/app/components/Button';
import { ComponentProps } from 'react';
import { useNavigation } from '@remix-run/react';
import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';

export type PaginationProps = {
  appliedPaginationLimit: number;
  allowedPaginationLimits: Set<number>;
  totalItems: number;
  appliedPaginationPage: number;
};

export function Pagination({
  appliedPaginationLimit,
  allowedPaginationLimits,
  totalItems,
  appliedPaginationPage,
  ...props
}: PaginationProps & ComponentProps<'div'>) {
  const navigation = useNavigation();
  // const { t } = useTranslation();

  return (
    <div
      {...props}
      className={clsx(
        'flex flex-row gap-4',
        props.className,
      )}
    >
      <span className="flex text-sm gap-4 items-center justify-between">
        {navigation.state !== 'idle' && (

          <ArrowPathIcon className="animate-spin h-6 w-6 text-gray-500" />
        )}
        <Select
          name="limit"
          required
          noPlaceholder
          defaultValue={appliedPaginationLimit}
        >
          {Array.from(allowedPaginationLimits).map((x) => (
            <option key={x} value={x}>
              {x} 
            </option>
          ))}
        </Select>
        
      </span>
      <span className="flex text-sm gap-4 items-center">results per Page</span>
      

      <div className="flex" role="group">
        <Button
          name="page"
          type="submit"
          value={appliedPaginationPage - 1}
          disabled={appliedPaginationPage <= 1 || navigation.state !== 'idle'}
          className="!text-sm rounded-r-none border-r-0"
        >
          {
          // t
          ('prev')}
        </Button>
        <Button
          name="page"
          type="submit"
          value={appliedPaginationPage + 1}
          disabled={
            appliedPaginationPage * appliedPaginationLimit >= totalItems ||
            navigation.state !== 'idle'
          }
          className="!text-sm rounded-l-none"
        >
          {
          // t
          ('next')}
        </Button>
      </div>
    </div>
  );
}
