import '~/src/styles/reset.scss';
import '~/src/styles/colors.scss';
import '~/src/styles/typography.scss';
import '~/src/styles/global.scss';
import '~/src/styles/utils.scss';

import { json, LoaderFunctionArgs } from '@remix-run/node';
import {
    Links,
    Meta,
    type MetaFunction,
    Outlet,
    Scripts,
    ScrollRestoration,
    ShouldRevalidateFunction,
    useLoaderData,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import { getCollections } from './providers/collections/collections';
import { activeChannel } from './providers/channel/channel';
import { useActiveOrder } from './utils/use-active-order';
import { getActiveCustomer } from './providers/customer/customer';
// import { RouteBreadcrumbs } from '~/src/components/breadcrumbs/use-breadcrumbs';
import CartTray from '~/app/components/cart/CartTray';
import { Footer } from '~/app/components/footer/footer/footer';
import { Header } from '~/app/components/header/header/header';
// import { NavigationProgressBar } from '~/src/components/navigation-progress-bar/navigation-progress-bar';
// import { Toaster } from '~/src/components/toaster/toaster';

import '~/src/styles/tailwind.css';
import styles from './root.module.scss';

// The root data does not change once loaded.
export const shouldRevalidate: ShouldRevalidateFunction = ({
    nextUrl,
    currentUrl,
    formAction,
  }) => {
    if (currentUrl.pathname === '/sign-in') {
      // just logged in
      return true;
    }
    if (currentUrl.pathname === '/account' && nextUrl.pathname === '/') {
      // just logged out
      return true;
    }
    if (formAction === '/checkout/payment') {
      // submitted payment for order
      return true;
    }
    return false;
  };

export type RootLoaderData = {
    activeCustomer: Awaited<ReturnType<typeof getActiveCustomer>>;
    activeChannel: Awaited<ReturnType<typeof activeChannel>>;
    collections: Awaited<ReturnType<typeof getCollections>>;
};

export async function loader({ request, params, context  }: LoaderFunctionArgs) {
    const activeCustomer = await getActiveCustomer({ request });

    const collections = await getCollections(request, { take: 100 });
    const colCollections = collections.filter(
        (collection) => collection.parent?.slug === 'collections',
    );
    const colCategories = collections.filter(
        (collection) => collection.parent?.slug === 'categories',
    );
    const colSpecials = collections.filter((collection) => collection.parent?.slug === 'specials');

    const loaderData: RootLoaderData = {
        collections,
        activeCustomer,
        activeChannel: await activeChannel({ request }),

    };

    return json(
        {
            ...loaderData,
        },
        { headers: activeCustomer._headers }
    );
}

// const breadcrumbs: RouteBreadcrumbs = () => [{ title: 'Home', to: '/' }];

// export const handle = {
//     breadcrumbs,
// };

export function Layout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                 initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const [open, setOpen] = useState(false);
    const loaderData = useLoaderData<RootLoaderData>();

    const { 
        activeOrderFetcher, 
        activeOrder, 
        adjustOrderLine, 
        removeItem, 
        refresh } =
        useActiveOrder();

        useEffect(() => {
            // When the loader has run, this implies we should refresh the contents
            // of the activeOrder as the user may have signed in or out.
            refresh();
          }, [loaderData]);

    return (

                <div>
                    <div className={styles.root}>
                        <Header
                            onCartIconClick={() => setOpen(!open)}
                            cartQuantity={activeOrder?.totalQuantity ?? 0}
                            collections={loaderData.collections}
                        />
                        <main className={styles.main}>
                            <Outlet
                                context={{
                                    activeOrderFetcher,
                                    activeOrder,
                                    adjustOrderLine,
                                    removeItem,
                                }}
                            />
                        </main>
                        <Footer />
                    </div>
                    <CartTray
                              open={open}
                              onClose={setOpen}
                              activeOrder={activeOrder}
                              adjustOrderLine={adjustOrderLine}
                              removeItem={removeItem}
                    />
                    {/* <NavigationProgressBar className={styles.navigationProgressBar} /> */}
                    {/* <Toaster /> */}
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

export { ErrorBoundary } from '~/src/components/error-page/error-page';
