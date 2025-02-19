import { useLoaderData, useLocation, Link } from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import { useRootLoader } from '~/utils/use-root-loader';
import Cart from '~/app/components/svgs/Cart';
import { classNames } from '~/utils/class-names';
import Logo from '~/app/components/svgs/Logo';
import MobileMenu from './sheetMenu/MobileMenu'; // Import MobileMenu

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const [rootRouteOpacity, setRootRouteOpacity] = React.useState(1);
  const [headerOpacity, setHeaderOpacity] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    const checkRootRoute = () => {
      setRootRouteOpacity(location.pathname === '/' ? 0 : 1);
    };

    checkRootRoute();
  }, [location]);

  React.useEffect(() => {
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

  const data = useRootLoader();
  const { collections } = useLoaderData<typeof loader>();

  return (
    <header
      className="z-40 top-0 flex items-center fixed justify-between border-b-[2px] h-20 w-full"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
        borderColor: `rgba(${255 * (1 - headerOpacity - rootRouteOpacity)}, ${
          255 * (1 - headerOpacity - rootRouteOpacity)
        }, ${255 * (1 - headerOpacity - rootRouteOpacity)})`,
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <div className="relative flex flex-row items-center justify-between h-full w-full ">
        <div className="relative flex flex-col items-center justify-center w-20 p-4">
          <button
            className="flex flex-col  bg-opacity-90 shadow-none cursor-pointer justify-center rounded-full items-center py-2 text-sm text-discogray transition-all duration-300 ease-out hover:opacity-70"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <Cart
              className="iconsize z-40"
              fill={`rgba(${255 * (1 - headerOpacity - rootRouteOpacity)}, ${
                255 * (1 - headerOpacity - rootRouteOpacity)
              }, ${255 * (1 - headerOpacity - rootRouteOpacity)})`}
            />
            {cartQuantity ? (
              <div className="top-[40px] left-[14px] w-5 h-5 z-40 absolute items-center font-bold justify-center rounded-full text-sm bg-discoyellow-200 text-discogray">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
        </div>

        <div className="z-40 min-w-[100px] flex flex-col w-full justify-center mx-auto">
          <Link to="/" className="">
            <Logo
              className="max-h-10 mx-auto"
              fill={`rgba(${255 * (1 - headerOpacity - rootRouteOpacity)}, ${
                255 * (1 - headerOpacity - rootRouteOpacity)
              }, ${255 * (1 - headerOpacity - rootRouteOpacity)})`}
            />
          </Link>
        </div>

        <div className="z-40 relative flex flex-col items-center justify-center w-20 p-4">


          <MobileMenu 
          collections={collections} 
          headerOpacity={headerOpacity}
          rootRouteOpacity={rootRouteOpacity}
          /> {/* Use MobileMenu */}

        </div>

      </div>
    </header>
  );
}