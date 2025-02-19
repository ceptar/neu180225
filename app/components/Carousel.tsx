// import React, {
//   MouseEvent as ReactMouseEvent,
//   useRef,
//   useState,
//   useEffect,
// } from 'react';
// import type { PanInfo } from 'framer-motion';
// import { AnimatePresence, motion, MotionConfig, useAnimation, useMotionValue, useSpring } from 'framer-motion';
// import { wrap } from 'popmotion';
// import DiscoPfeilLinks from './svgs/DiscoPfeilLinks';
// import DiscoPfeilRechts from './svgs/DiscoPfeilRechts';
// import { Link } from '@remix-run/react';
// import { ProductCard } from '~/app/components/products/ProductCard';

// const DRAG_THRESHOLD = 150;
// const FALLBACK_WIDTH = 509;

// export default function Carousel({ featuredProducts }) {
//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset: number, velocity: number) => {
//     return Math.abs(offset) * velocity;
//   };

//   const CAROUSEL_LENGTH = featuredProducts.length;
//   const GAP = 16;
//   const gapSum = (CAROUSEL_LENGTH - 1) * GAP;

//   const containerRef = useRef(null);
//   const carouselRef = useRef(null);
//   const controls = useAnimation();
//   const [page, setPage] = useState(0);

//   const currIndex = wrap(0, CAROUSEL_LENGTH, page);

//   const paginate = (newDirection) => {
//     setPage(wrap(0, CAROUSEL_LENGTH, page + newDirection));
//   };

//   const calcX = (index) => {
//     if (!carouselRef.current) return 0;

//     const childWidth =
//       (carouselRef.current.offsetWidth - gapSum) / CAROUSEL_LENGTH;
//     return index * childWidth + index * GAP;
//   };

//   const [isDragging, setIsDragging] = useState(false);
//   const offsetX = useMotionValue(0);
//   const animatedX = useSpring(offsetX, {
//     damping: 40,
//     stiffness: 100,
//   });

//   const handleDragSnap = (
//     _: MouseEvent,
//     { offset: { x: offsetX }, velocity: { x: velocityX } }: PanInfo,
//   ) => {
//     if (!carouselRef.current || !containerRef.current) return;

//     console.clear();

//     const swipe = swipePower(offsetX, velocityX);
//     const isRightDirection = offsetX > 45 && velocityX >= 0;
//     const isLeftDirection = offsetX < -45 && velocityX <= 0;

//     const childW = (carouselRef.current.offsetWidth - gapSum) / CAROUSEL_LENGTH;

//     const carouselDiments = carouselRef.current.getBoundingClientRect();
//     const containerDiments = containerRef.current.getBoundingClientRect();

//     const isPassedBoundaries =
//       containerDiments.right > carouselDiments.right - childW;

//     let newCurrIndex = currIndex;
//     let switchSlideBy = Math.ceil(-offsetX / (childW + GAP));

//     if (swipe > swipeConfidenceThreshold || isRightDirection) {
//       switchSlideBy = switchSlideBy - 1;

//       newCurrIndex = currIndex > 0 ? currIndex + switchSlideBy : currIndex;
//       if (newCurrIndex < 0) newCurrIndex = 0;

//       const indexDiff = newCurrIndex - currIndex;
//       if (indexDiff < 0) {
//         switchSlideBy = indexDiff;
//       }

//       if (currIndex > newCurrIndex) {
//         paginate(switchSlideBy);
//       }
//     } else if (swipe > swipeConfidenceThreshold || isLeftDirection) {
//       const lastIndex = CAROUSEL_LENGTH - 1;

//       newCurrIndex =
//         currIndex < lastIndex ? currIndex + switchSlideBy : currIndex;
//       if (newCurrIndex > lastIndex) newCurrIndex = lastIndex;
//       if (isPassedBoundaries) {
//         const childrenOnScreen = Math.floor(
//           containerRef.current.offsetWidth / childW,
//         );
//         newCurrIndex = CAROUSEL_LENGTH - childrenOnScreen;
//       }

//       const indexDiff = newCurrIndex - currIndex;
//       if (switchSlideBy > indexDiff) {
//         switchSlideBy = indexDiff;
//       }

//       if (currIndex < newCurrIndex) {
//         paginate(switchSlideBy);
//       }
//     }

//     // if carousel has passed the boundaries of a container
//     if (isPassedBoundaries && currIndex <= newCurrIndex) {
//       const rightEdge =
//         -carouselRef.current.offsetWidth + containerRef.current.offsetWidth;
        
//         // ACHTUNG MIT ZEILE DARÜBER DEN RECHTEN RAND EINSTELLEN !!!

//       controls.start({ x: rightEdge });
//     } else {
//       controls.start({ x: -calcX(newCurrIndex) });
//     }
//   };

//   const handleDragEnd = (event, { velocity, offset }) => {
//     handleDragSnap(event, { offset, velocity });
//     setIsDragging(false); // Set isDragging to false when drag ends
//   };

//   const disableDragClick = (e) => {
//     if (isDragging) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//   };

//   const canScrollPrev = () => {
//     return offsetX.get() < 0;
//   };

//   const canScrollNext = () => {
//     const containerWidth = containerRef.current.offsetWidth;
//     const carouselWidth = carouselRef.current.scrollWidth;
//     return offsetX.get() > -(carouselWidth - containerWidth);
//   };

//   useEffect(() => {
//     controls.start({ x: -calcX(page) });
//   }, [page, controls]);

//   const handleDrag = (event, info) => {
//     const { offset } = info;
//     const containerWidth = containerRef.current.offsetWidth;
//     const carouselWidth = carouselRef.current.scrollWidth;
//     const newOffset = offsetX.get() + offset.x;

//     if (newOffset > 0) {
//       offsetX.set(0);
//     } else if (newOffset < -(carouselWidth - containerWidth)) {
//       offsetX.set(-(carouselWidth - containerWidth));
//     } else {
//       offsetX.set(newOffset);
//     }

//     setIsDragging(true); // Set isDragging to true when drag starts
//   };

//   return (
//     <MotionConfig transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
//     <div className="flex flex-row w-full px-4 ">
      
//     <div
//     className="relative flex overflow-hidden"
//       ref={containerRef}
//     >
//       <div className="h-full">
//           <AnimatePresence initial={false}>
//             {currIndex > 0 && (
//               <motion.button
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.8 }}
//                 exit={{ opacity: 0, pointerEvents: "none" }}
//                 whileHover={{ opacity: 1 }}
//                 className="absolute top-[calc(50%-18px)] left-0 flex h-9 w-9 items-center justify-center cursor-pointer z-[2]"
//                 onClick={() => paginate(-1)}
//               >
//                 <DiscoPfeilLinks className="h-9 w-9 bg-discogray backdrop-blur-md text-white opacity-85 -ml-1 bg-blend-difference"/>
//               </motion.button>
//             )}
//           </AnimatePresence>
//           </div>
//           <div className="h-full">
//           <AnimatePresence initial={false}>
//             {currIndex + 1 < featuredProducts.length && (
//               <motion.button
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.8 }}
//                 exit={{ opacity: 0, pointerEvents: "none" }}
//                 whileHover={{ opacity: 1 }}
//                 className="absolute top-[calc(50%-18px)] right-0 flex h-9 w-9 items-center justify-center cursor-pointer z-[2]"
//                 onClick={() => paginate(1)}
//               >
//                 <DiscoPfeilRechts className="h-9 w-9 bg-discogray backdrop-blur-md text-white opacity-85 -mr-1 bg-blend-difference"/>
//               </motion.button>
//             )}
//           </AnimatePresence>
//           </div>
//       <motion.div
//       className="flex gap-4 w-fit"
//         ref={carouselRef}
//         drag="x"
//         animate={controls}
//         transition={{
//           type: 'spring',
//           damping: 40,
//           stiffness: 400,
//         }}
//         onDragStart={() => setIsDragging(true)}
//         onDragEnd={handleDragEnd}
//         onDrag={handleDrag}
//       >
//         {featuredProducts.map((product, index) => (
//           <div
//             key={index} // Prefer using a unique product identifier here
//             className="relative flex-shrink-0 flex flex-col b-radius-0 
//             w-[calc(50vw-24px)] md:w-[calc(25vw-24px)]
//             "
//  /* 
//  w-[calc(100vw-48px)] 
//  darüber nach " einsetzen!         w-[calc(100vw-30px)] sm:w-[calc(50vw-25px)] lg:w-[calc(33vw-20px)] */
// //mit diesen größen lässt sich die anzahl an cards je nach zb screengröße einstellen

//           >
//             <ProductCard {...product} />
//             <Link
//               to={`/products/${product.slug}`} // Use the slug from the product data
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 backgroundColor: 'transparent',
//                 zIndex: 1,
//                 cursor: 'pointer',
//               }}
//               onMouseDown={(e) => e.preventDefault()} // Prevent drag image behavior
//               onClick={disableDragClick}
//             ></Link>
            
//           </div>
//         ))}
//       </motion.div>
//     </div>
//     </div>
//     </MotionConfig>
//   );
// }
