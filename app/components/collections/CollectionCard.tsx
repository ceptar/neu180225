// import { Link } from '@remix-run/react';
// import type { CollectionsQuery } from '~/generated/graphql';

// export function CollectionCard({
//   collection,
// }: {
//   collection: CollectionsQuery['collections']['items'][number];
// }) {
//   return (
//     <Link
//       to={'/collections/' + collection.slug}
//       prefetch="intent"
//       key={collection.id}
//     >
//       <section className="relative w-full flex flex-col items-end overflow-hidden">
//         <div
//           className="absolute min-w-full min-h-full top-0 left-0 rounded-none overflow-hidden bg-left bg-cover"
//           style={{ backgroundImage: `url(${collection.featuredAsset.source})` }}
//         ></div>
//         <div className="absolute top-0 left-0 w-full h-full flex-row justify-end overflow-hidden"></div>
//         <div className="relative w-full h-[5rem] flex border-b border-t border-discogray "></div>
//         <div className="relative w-full h-full flex justify-center items-center bg-discogray bg-opacity-75 border-b border-t border-discogray">
//           <div className="w-[full] flex-row items-end pt-[0.5rem] pr-8 pb-2 pl-[2rem] font-bold text-3xl leading-tight text-center text-white bg-opacity-75">
//             {collection.name}
//           </div>
//         </div>
//       </section>
//     </Link>
//   );
// }

