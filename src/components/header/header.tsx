import { Link, useNavigate, useLocation, useLoaderData, json } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/server-runtime';
import classNames from 'classnames';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CartIcon, DiscoLogo } from '~/src/components/icons';
import MobileMenu from '~/app/components/header/sheetMenu/MobileMenu';
import { Weight } from "lucide-react";
import CartTray from '~/app/components/cart/CartTray';
import Cart from '~/app/components/svgs/Cart';

import styles from './header.module.scss';
export interface HeaderProps {
    className?: string;
    collections: Array<any>;
    onCartIconClick: () => void;
    cartQuantity: number;
}

export const Header = ({ className, collections,onCartIconClick, cartQuantity, }: HeaderProps) => {

    const navigate = useNavigate();
    console.log('collectionsHeader', collections);

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


                            <div className="relative flex flex-row items-center justify-between h-full w-full ">

        <div className="flex-1 flex-col items-center justify-center">
        <button
            className="flex flex-col  bg-opacity-90 shadow-none cursor-pointer justify-center rounded-full items-center py-2 text-sm transition-all duration-300 ease-out hover:opacity-70"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <Cart
            />
            {cartQuantity ? (
              <div className="w-5 h-5 z-40 absolute items-center font-bold justify-center rounded-full text-sm"
              style={{
                backgroundColor: "#ffff0078",
                left: "18px",
                top: "20px",
              }}>
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
        </div>


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
                   
                            <Link to="/" className={styles.logo}>
                                <DiscoLogo />
                            </Link>

                            <div className="flex justify-end items-center flex-1">
                             <MobileMenu
                        collections={collections}
                        headerOpacity={headerOpacity} 
                        rootRouteOpacity={rootRouteOpacity}
/>    </div>
                           
                            </div>
                    </section>
 
                </div>
        
                </div>
        </header>
    );
};
