import * as React from 'react';
import { useLoaderData, useSubmit, Form } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { sdk } from '~/app/graphqlWrapper';
import FacetFilterDrawer from '~/app/components/FacetFilters/FacetFilterDrawer';
import FramerModal from '~/app/components/FramerModal/FramerModal';
import { Link } from '@remix-run/react';
import { Price } from '~/app/components/products/Price';
import { CurrencyCode } from '~/app/generated/graphql';

export const loader: LoaderFunction = async ({ params, request }) => {
  console.log('collectionSlug', params.categorySlug)
  const url = new URL(request.url);
  const term = url.searchParams.get('term') || '';
  const filterIds = url.searchParams.get('filterIds')?.split(',') || [];
  const categorySlug = params.categorySlug

  const { collection } = await sdk.collection({ slug: categorySlug });
  const { search } = await sdk.search({
    input: {
      term,
      collectionSlug: params.categorySlug,
      groupByProduct: true,
      facetValueFilters: filterIds.map(id => ({ and: id })),
    },
  });

  return { collection, search, term, filterIds };
};

export default function ProductsPage() {
  const { collection, search, term, filterIds } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleFilterChange = (newFilterIds: string[]) => {
    submit({ filterIds: newFilterIds.join(','), term }, { method: 'get' });
  };

  return (
    <div className="w-full mt-[112px]">
          <div className="">      

<FacetFilterDrawer
      results={search.facetValues}
      filterIds={filterIds}
      updateFilterIds={handleFilterChange}
    />
    </div>
     

    <div className="py-8 relative h-[5rem] z-20 flex justify-start items-center mr-auto ml-auto w-full">
    <h2 id="category-heading" className="items-center justify-start flex leading-10">
      <span className="text-[calc(1.5vw+2.5vh)]">
        {collection.name}
      </span>
    </h2>
  </div>


  <div className="relative h-full my-4 py-4"> 
<div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">        
  {search.items.map(({ productName, slug, priceWithTax, currencyCode, productAsset }) => (
          <div className="break-inside-avoid object-cover w-full mb-4" key={slug}>
            <Link to={`/product-details/${slug}`} prefetch="intent">
              <img
                className="object-cover aspect-[5/8]"
                alt={productName}
                src={productAsset?.preview + '?w=full'}
              ></img>
                     <div className="relative w-full mx-auto bottom-0 left-0">
                     <div className="text-center bg-neutral-800 absolute bottom-0 left-0 w-fit h-fit text-white p-1 ">                
                      <Price priceWithTax={priceWithTax} currencyCode={currencyCode as CurrencyCode} />               
                </div>
              </div>
              <div className="py-2 pl-1 whitespace-nowrap overflow-hidden">
                {productName}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
