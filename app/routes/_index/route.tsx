import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData , useRouteLoaderData} from '@remix-run/react';
import { getCollectionProducts } from '~/app/providers/products/collectionProducts';
import type { MetaFunction } from '@remix-run/react';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FeaturedProductsSection } from '~/src/components/featured-products-section/featured-products-section';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import { BackgroundParallax, FadeIn, FloatIn } from '~/src/components/visual-effects';

export async function loader({ request }: LoaderFunctionArgs) {
        const collectionProducts = await getCollectionProducts(
            "sc2-featured-items",
            0,
            100,
         );
        const collectionProductsZwo = await getCollectionProducts(
            "sc1-new-in",
            0,
            100,
        );
        console.log('featuredProducts', collectionProducts)

            return { collectionProducts, collectionProductsZwo };
    };

export default function HomePage() {
    const rootLoaderData =
    useRouteLoaderData<typeof rootLoader>("root")
    const colHomeEins = rootLoaderData.collections?.find(
        (collection: { slug: string; }) => collection.slug === 'sc1-new-in',
    );
    const colHomeZwei = rootLoaderData.collections?.find(
        (collection: { slug: string; }) => collection.slug === 'ca-beach',
    );
    const colHomeDrei = rootLoaderData.collections?.find(
        (collection: { slug: string; }) => collection.slug === 'ca-hot-pink-ocean-berry',
    );
    const { collectionProducts } = useLoaderData<typeof loader>();
    const featuredProducts = collectionProducts?.search?.items;
    const { collectionProductsZwo } = useLoaderData<typeof loader>();
    const featuredProductsZwo = collectionProductsZwo?.search?.items;

    return (
        <div>
            <div className="heroBannerImageFrame">
            <img src="./fthdrg.webp" className="heroBannerImage" alt="" />
            </div>
            <div className="heroBanner">
                <div className="heroBannerOverlay">
                    <h1 className="heroBannerTitle">Life's</h1>
                    <div className="heroBannerSubtitle">too</div>
                    <h1 className="heroBannerTitle">short</h1>
                    <div className="heroBannerSubtitle">to wear boring</div>
                    <h1 className="heroBannerTitle">jewelry</h1>

                    <CategoryLink categorySlug="all-products">
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </div>
            </div>

            <div className="textBannerSection">
                <FadeIn className="textBanner" duration={1.8}>
                    <div className="textBannerSubtitle">Products of the highest standards</div>
                    <div className="textBannerTitle">
                        Essential home collections for sustainable living
                    </div>
                    <CategoryLink categorySlug="aa-all-products">
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </FadeIn>
            </div>

            <div className="cardsSection">
                <CategoryLink categorySlug={colHomeEins?.slug} className="linkCard">
                    <img
                        className="linkCardBackground"
                        src={colHomeEins?.featuredAsset?.preview}
                        alt=""
                    />
                    <div className="linkCardTitle">{colHomeEins?.name}</div>
                </CategoryLink>
                <CategoryLink categorySlug={colHomeZwei?.slug} className="linkCard">
                    <img
                        className="linkCardBackground"
                        src={colHomeZwei?.featuredAsset?.preview}
                        alt=""
                    />
                    <div className="linkCardTitle">{colHomeZwei?.name}</div>
                </CategoryLink>
                <CategoryLink categorySlug={colHomeDrei?.slug} className="linkCard">
                    <img
                        className="linkCardBackground"
                        src={colHomeDrei?.featuredAsset?.preview}
                        alt=""
                    />
                    <div className="linkCardTitle">{colHomeDrei?.name}</div>
                </CategoryLink>
            </div>

            <FeaturedProductsSection
                featuredProducts={featuredProducts}
                className="alternateBackground"
                categorySlug="sc2-featured-items"
                title="Featured Items"
                description="Shine bright like a diamond."
                productCount={4}
            />

            <BackgroundParallax
                className="floatingCardBackground"
                backgroundImageUrl="./heropara.webp"
                parallaxStrength={1}
            >
                <FloatIn direction="up" duration={1.2} distance={120}>
                    <div className="floatingCard">
                        <div className="floatingCardHeader">Happy Holidays</div>
                        <div className="floatingCardContent">
                            <h2 className="floatingCardTitle">The holidays best sellers</h2>
                            <div className="floatingCardDescription">
                                Home essentials for
                                <br /> sustainable living
                            </div>
                        </div>
                        <CategoryLink categorySlug="all-products">
                            <LabelWithArrow>Buy a gift</LabelWithArrow>
                        </CategoryLink>
                    </div>
                </FloatIn>
            </BackgroundParallax>

            <FeaturedProductsSection
                featuredProducts={featuredProductsZwo}
                categorySlug="sc1-new-in"
                title="New In"
                description="Are You an explorer?"
                productCount={4}
            />
        </div>
    );
}

export const meta: MetaFunction = () => {
    const title = 'ReClaim: Home Goods Store';
    const description = 'Essential home products for sustainable living';

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
            content: '/social-media-image.jpg',
        },
    ];
};
