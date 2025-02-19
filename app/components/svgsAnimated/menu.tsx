'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

const lineVariants: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  animate: (custom: number) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
};

interface MenuIconProps {
  headerOpacity: number;
  rootRouteOpacity: number;
  isOpen: boolean;
  onClick: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ headerOpacity, rootRouteOpacity, isOpen, onClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      controls.start('animate');
    } else {
      controls.start('normal');
    }
  }, [isOpen, controls]);

  return (
    <div
      className="cursor-pointer select-none py-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={`rgba(${255 * (1 - headerOpacity - rootRouteOpacity)}, ${
          255 * (1 - headerOpacity - rootRouteOpacity)
        }, ${255 * (1 - headerOpacity - rootRouteOpacity)})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="iconsize" 
      >
        <motion.line
          x1="4"
          y1="6"
          x2="20"
          y2="6"
          variants={lineVariants}
          animate={controls}
          custom={1}
        />
        <motion.line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          variants={lineVariants}
          animate={controls}
          custom={2}
        />
        <motion.line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          variants={lineVariants}
          animate={controls}
          custom={3}
        />
      </svg>
    </div>
  );
};

export { MenuIcon };