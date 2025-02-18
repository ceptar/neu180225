import { sdk } from '~/app/graphqlWrapper';
import { getProductBySlug } from '~/providers/products/products';

export async function getCollectionProducts(slug: string, skip: number = 0, take: number = 10) {
  const collectionProducts = await sdk.GetCollectionProducts({ slug, skip, take });

  const detailedProducts = await Promise.all(
    collectionProducts.search.items.map(async (item) => {
      const productDetail = await getProductBySlug(item.slug, {});
      return {
        ...item,
        assets: productDetail.product.assets,
        featuredAsset: productDetail.product.featuredAsset,
      };
    })
  );

  return {
    ...collectionProducts,
    search: {
      ...collectionProducts.search,
      items: detailedProducts,
    },
  };
}

const GET_COLLECTION_PRODUCTS = /*GraphQL*/ `
query GetCollectionProducts($slug: String!, $skip: Int!, $take: Int!) {
  collection(slug: $slug) {
    id
    name
    description
    featuredAsset {
      id
      preview
    }
  }
  search(
    input: {
      collectionSlug: $slug,
      groupByProduct: true,
      skip: $skip,
      take: $take }
  ) {
    totalItems
    items {
      productId
      productName
      slug
      productAsset {
        id
        preview
      }
      priceWithTax {
        ... on SinglePrice {
          value
        }
        ... on PriceRange {
          min
          max
        }
      }
      currencyCode
    }
  }
}
`;
