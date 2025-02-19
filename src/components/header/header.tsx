import { Link, useNavigate, useLocation, useLoaderData, json } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/server-runtime';
import classNames from 'classnames';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CartIcon, DiscoLogo } from '~/src/components/icons';
import { getCartItemCount, useCartData, useCartOpen } from '~/src/wix/cart';
import MobileMenu from '~/app/components/header/sheetMenu/MobileMenu';
// import { NavigationMenu } from '../navigation-menu/navigation-menu';
// import { SearchInput } from '../search-input/search-input';
// import { SidebarNavigationMenu } from '../sidebar-navigation-menu/sidebar-navigation-menu';
// import { motion, useScroll, useTransform } from "framer-motion";
// import { UserMenu } from '../user-menu/user-menu';


import styles from './header.module.scss';
export interface HeaderProps {
    className?: string;
    collections: Array<any>;
}

export const Header = ({ className, collections }: HeaderProps) => {
    // const cartOpener = useCartOpen();
    const navigate = useNavigate();
    console.log('collectionsHeader', collections);
    const onSearchSubmit = (search: string) => {
        navigate(`/products/all-products?search=${encodeURIComponent(search)}`);
    };

    // const cartItemCount = cart.data ? getCartItemCount(cart.data) : 0;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [rootRouteOpacity, setRootRouteOpacity] = React.useState(1);
    const [headerOpacity, setHeaderOpacity] = React.useState(0);
    const location = useLocation();

    useEffect(() => {
        const checkRootRoute = () => {
            setRootRouteOpacity(location.pathname === '/' ? 0 : 1);
        };

        checkRootRoute();
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const newOpacity = Math.min(scrollPosition / 70, 1);
            setHeaderOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={classNames(styles.root, className)}>
            <div
                className={styles.navbarBackground}
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
                    color: `rgba(${255 * (1 - headerOpacity - rootRouteOpacity)}, ${
                        255 * (1 - headerOpacity - rootRouteOpacity)
                    }, ${255 * (1 - headerOpacity - rootRouteOpacity)})`,
                    transition: 'background-color 0.3s, color 0.3s',
                }}
            >
                <div className="navbarFrame">
                    <section className={styles.topBar}>
                        <div className="w-full flex justify-evenly">
                            <div className="flex flex-1">
                                {/* <button
                        className={classNames(styles.cartButton, 'iconButton')}
                        onClick={() => cartOpener.setIsOpen(true)}
                    >
                        <CartIcon className={styles.cart} 
                        // count={cartItemCount} 
                        headerOpacity={headerOpacity} 
                        rootRouteOpacity={rootRouteOpacity}
                        />
                    </button> */}
                            </div>
                            <Link to="/" className={styles.logo}>
                                <DiscoLogo />
                            </Link>
                            {/* <div>
                    <div className={styles.advertisingText}>
                        Free shipping on all intl. orders over $35
                    </div>
                    <Link className={styles.shopNow} to="/products/all-products">
                        Shop Now
                    </Link>
                </div> */}
                            <div className="flex justify-end items-center flex-1">
                             <MobileMenu
                        collections={collections}
                        headerOpacity={headerOpacity} 
                        rootRouteOpacity={rootRouteOpacity}
/>
                            </div>
                        </div>
                    </section>
                    {/* <section className={styles.navigation}>
                <SearchInput className={styles.searchInput} onSearchSubmit={onSearchSubmit} />
                <NavigationMenu className={styles.menu} />
                <div className={styles.actions}>
                    <UserMenu />




                </div>
            </section> */}

                    {/* <SidebarNavigationMenu open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
                </div>
            </div>
        </header>
    );
};
