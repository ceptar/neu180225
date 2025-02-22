import { motion } from 'motion/react';
import React from 'react';

/**
 * A visual effect where the content transitions from transparent to opaque.
 * 
 * Example: 
 *       <ButtonInOut className="w-10 h-10 aspect-[1/1] rounded-full bg-white cursor-pointer">
        <MenuIcon />
      </ButtonInOut>
 */
export const ButtonInOut: React.FC = ({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    {...props}
  >
    {children}
  </motion.div>
);
