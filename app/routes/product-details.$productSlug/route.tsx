import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useState } from 'react';
import {
    FetcherWithComponents,
    ShouldRevalidateFunction,
    useLoaderData,
    useOutletContext,
    MetaFunction,
} from '@remix-run/react';
import {
    OctagonAlert as Alert,
    Check,
    Minus as MinusIcon,
    Plus as PlusIcon,
    Image as PhotoIcon,
} from 'lucide-react';
import { Price } from '~/app/components/products/Price';
import { ColorSwatches } from '~/app/components/FacetFilters/ColorSwatches';
import { CartLoaderData } from '~/app/routes/api.active-order/route';

import { getSessionStorage } from '~/app/sessions';
import { ErrorCode, ErrorResult } from '~/app/generated/graphql';

import { getProductBySlug } from '~/app/providers/products/products';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '~/app/components/ui/carousel';
import styles from './route.module.scss';

export async function loader({ params, request }: DataFunctionArgs) {
    const { product } = await getProductBySlug(params.productSlug!, { request });

    if (!product) {
        throw new Response('Not Found', {
            status: 404,
        });
    }

    const sessionStorage = await getSessionStorage();
    const session = await sessionStorage.getSession(request?.headers.get('Cookie'));
    const error = session.get('activeOrderError');
    return json(
        { product: product!, error },
        {
            headers: {
                'Set-Cookie': await sessionStorage.commitSession(session),
            },
        },
    );
}

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function ProductDetailsPage() {
    const { product, error } = useLoaderData<typeof loader>();
    const { activeOrderFetcher } = useOutletContext<{
        activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
    }>();
    const { activeOrder } = activeOrderFetcher.data ?? {};
    const addItemToOrderError = getAddItemToOrderError(error);
    // const { t } = useTranslation();

    if (!product) {
        return <div>Product not found!</div>;
    }

    const findVariantById = (id: string) => product.variants.find((v) => v.id === id);

    const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
    const selectedVariant = findVariantById(selectedVariantId);
    if (!selectedVariant) {
        setSelectedVariantId(product.variants[0].id);
    }

    const qtyInCart =
        activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)?.quantity ?? 0;

    const asset = product.assets[0];

    const colorFacetValues = product.facetValues.filter(
        (fv) => fv.facet.code.toLowerCase() === 'colors',
    );
    const [featuredAsset, setFeaturedAsset] = useState(selectedVariant?.featuredAsset);
    return (
        <div className={styles.page}>
            {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
            <div>
                <div className={styles.content}>
                    <div className="justify-self-end">
                        <Carousel className="w-full rounded-none">
                            <CarouselContent className="aspect-[4/6] max-h-[80vh] ">
                                {product.assets.map((asset, assetIndex) => (
                                    <CarouselItem key={`${asset.id}-${assetIndex}`}>
                                        <div className="relative ">
                                            <img
                                                src={asset.preview}
                                                alt={`${product.name} - Image ${assetIndex + 1}`}
                                                className="object-cover object-center"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div>
                        <h1 className={styles.productName}>{product.name}</h1>

                        <div className="">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="text-base text-discogray"
                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                            />
                        </div>
                        <activeOrderFetcher.Form method="post" action="/api/active-order">
                            <input type="hidden" name="action" value="addItemToOrder" />
                            {1 < product.variants.length ? (
                                <div className="mt-4">
                                    <label
                                        htmlFor="option"
                                        className="block text-sm tracking-tight text-discopink-300"
                                    >
                                        Select option
                                    </label>
                                    <select
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-discogray focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        id="productVariant"
                                        value={selectedVariantId}
                                        name="variantId"
                                        onChange={(e) => {
                                            setSelectedVariantId(e.target.value);

                                            const variant = findVariantById(e.target.value);
                                            if (variant) {
                                                setFeaturedAsset(variant!.featuredAsset);
                                            }
                                        }}
                                    >
                                        {product.variants.map((variant) => (
                                            <option key={variant.id} value={variant.id}>
                                                {variant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <input
                                    type="hidden"
                                    name="variantId"
                                    value={selectedVariantId}
                                ></input>
                            )}
                            {/* Product price */}
                            <div className="flex flex-col">
                                <div className="uppercase text-lg py-2 ">
                                    <Price
                                        priceWithTax={selectedVariant?.priceWithTax}
                                        currencyCode={selectedVariant?.currencyCode}
                                    ></Price>
                                </div>

                                {/* ADD TO CART  */}
                                <div className="relative w-full pr-[4px]">
                                    <button
                                        type="submit"
                                        className={`
      relative w-full h-12 text-md uppercase tracking-[0.2em] 
      text-white bg-black border-[2px] border-black
      py-2.5 px-5 my-4 cursor-pointer shadow-[3px_3px_black]
      active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
      transition-all
      ${activeOrderFetcher.state !== 'idle' ? '' : ''}
      ${qtyInCart === 0 ? '' : ''}
    `}
                                        disabled={activeOrderFetcher.state !== 'idle'}
                                        // style={{
                                        //   background: generateGradient({
                                        //     colors: colorFacetValues,
                                        //   }),
                                        //   backgroundSize: '600% 100%',
                                        //   animation: 'gradient 16s ease infinite',
                                        // }}
                                    >
                                        {qtyInCart ? (
                                            <span className="flex items-center justify-center">
                                                <Check className="w-5 h-5 mr-1" /> {qtyInCart} in
                                                cart
                                            </span>
                                        ) : (
                                            'Add to cart'
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* <div className="mt-4 flex items-center">
                  <span className="text-gray-500 pr-2">
                    {selectedVariant?.sku}
                  </span>
                  <StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
                </div> */}
                            {addItemToOrderError && (
                                <div className="mt-4">
                                    <Alert message={addItemToOrderError} />
                                </div>
                            )}

                            <div className="pt-4 text-sm">
                                <h3 className="font-bold mb-2">Shipping & Returns</h3>
                                <div className="space-y-1">
                                    <p>
                                        Standard shipping: 3 - 5 working days. Express shipping: 1 -
                                        3 working days.
                                    </p>
                                    <p>
                                        Shipping costs depend on delivery address and will be
                                        calculated during checkout.
                                    </p>
                                    <p>
                                        Returns are subject to terms. Please see the{' '}
                                        <span className="underline">returns page</span> for further
                                        information.
                                    </p>
                                </div>
                                <div className="sm:justify-self-end pt-4">
                                    {/* ... existing image code ... */}
                                    <ColorSwatches colors={colorFacetValues} />
                                </div>
                            </div>
                        </activeOrderFetcher.Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = `${data?.product.name ?? 'Product Details'} | ReClaim`;
    const description = data?.product.description;

    return [
        { title },
        {
            name: 'description',
            content: description,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            // content: data?.product.media?.mainMedia?.image?.url ?? '/social-media-image.jpg',
        },
    ];
};

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
    if (!error || !error.errorCode) {
        return undefined;
    }
    switch (error.errorCode) {
        case ErrorCode.OrderModificationError:
        case ErrorCode.OrderLimitError:
        case ErrorCode.NegativeQuantityError:
        case ErrorCode.InsufficientStockError:
            return error.message;
    }
}

export { ErrorBoundary } from '~/src/components/error-page/error-page';
