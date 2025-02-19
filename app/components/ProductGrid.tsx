import React from 'react';
import type { SearchQuery } from '~/generated/graphql';
import { Price } from '~/app/components/products/Price';
import { Link } from '@remix-run/react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from './ui/carousel';

export default function ProductGrid({ featuredProducts: products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-2 w-full">
      {products.map((product, index) => (
        <div key={product.productId} className="w-full">
          <Carousel className="w-full rounded-none">
            <CarouselContent>
              {product.assets.map((asset, assetIndex) => (
                <CarouselItem key={`${product.productId}-${assetIndex}`}>
                  <div className="relative aspect-[4/6] w-full">
                    <Link to={`/products/${product.slug}`} prefetch="intent">
                    <img
                      src={asset.preview}
                      referrerPolicy="no-referrer-when-downgrade" // This is a workaround for a bug in Remix
                      crossOrigin="anonymous"
                      alt={`${product.productName} - Image ${assetIndex + 1}`}
                      className="object-cover w-full h-full"
                    />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute w-full bottom-0 justify-evenly">
              <div className="flex flex-col"></div>
            <CarouselDots />
            <div className="flex flex-col"></div>
            </div>
          </Carousel>
          <Link
            to={`/products/${product.slug}`}
            className="block mt-1 font-bold uppercase text-md text-center"
          >
            {product.productName}
          </Link>
        </div>
      ))}
    </div>
  );
}
