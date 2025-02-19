// import FacetFilterControls from '~/app/components/facet-filter/FacetFilterControls';
// import { ProductCard } from '~/app/components/products/ProductCard';
// import {
//   translatePaginationFrom,
//   translatePaginationTo,
// } from '~/utils/pagination';
// import { Pagination } from '~/app/components/Pagination';
// import { NoResultsHint } from '~/app/components/products/NoResultsHint';
// import { useRef } from 'react';
// import { FacetFilterTracker } from '~/app/components/facet-filter/facet-filter-tracker';
// import type { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';

// export function FilterableProductGrid({
//   result,
//   resultWithoutFacetValueFilters,
//   facetValueIds,
//   appliedPaginationPage,
//   appliedPaginationLimit,
//   allowedPaginationLimits,
//   mobileFiltersOpen,
//   setMobileFiltersOpen,
// }: Awaited<
//   ReturnType<
//     ReturnType<
//       typeof filteredSearchLoaderFromPagination
//     >['filteredSearchLoader']
//   >
// > & {
//   allowedPaginationLimits: Set<number>;
//   mobileFiltersOpen: boolean;
//   setMobileFiltersOpen: (arg0: boolean) => void;
// }) {
//   const facetValuesTracker = useRef(new FacetFilterTracker());
//   facetValuesTracker.current.update(
//     result,
//     resultWithoutFacetValueFilters,
//     facetValueIds,
//   );

//   return (
//     <div className="px-4">
//       {mobileFiltersOpen && (

//      <FacetFilterControls
//       facetFilterTracker={facetValuesTracker.current}
//         mobileFiltersOpen={mobileFiltersOpen}
//      setMobileFiltersOpen={setMobileFiltersOpen}
//  />
//       )}
//       {result.items.length > 0 ? (
//         <div className="">
//     <div className="columns-1 gap-4 sm:columns-2 md:columns-3 [&>img:not(:first-child)]:mt-4">            {result.items.map((item) => (
//               <ProductCard key={item.productId} {...item} />
//             ))}
//           </div>

//           <div className="pt-[5rem] flex flex-col justify-between items-center gap-4">
//            <div className="flex flex-row w-full h-[2rem] items-center justify-center">
//             <span className="text-gray-500 text-sm mt-2">
//               Showing products{' '}
//               {translatePaginationFrom(
//                 appliedPaginationPage,
//                 appliedPaginationLimit,
//               )}{' '}
//               to{' '}
//               {translatePaginationTo(
//                 appliedPaginationPage,
//                 appliedPaginationLimit,
//                 result.items.length,
//               )}
//             </span>
//             </div>
//             <Pagination
//               appliedPaginationLimit={appliedPaginationLimit}
//               allowedPaginationLimits={allowedPaginationLimits}
//               totalItems={result.totalItems}
//               appliedPaginationPage={appliedPaginationPage}
//             />
//           </div>
//         </div>
//       ) : (
//         <NoResultsHint
//           facetFilterTracker={facetValuesTracker.current}
//           className={'col-span-4 p-4'}
//         />
//       )}
//     </div>
//   );
// }