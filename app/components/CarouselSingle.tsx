import { useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, PanInfo } from "framer-motion";
import DiscoPfeilLinks from "./svgs/DiscoPfeilLinks";
import DiscoPfeilRechts from "./svgs/DiscoPfeilRechts";

// Reference Issue: https://stackoverflow.com/questions/77751989/framer-motion-drag-carousel-not-working-properly


export default function CarouselSingle({productAsset}) {
  const [index, setIndex] = useState(0);
  const constraintsRef = useRef(null);

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 20;
    if (draggedDistance > swipeThreshold) {
      index > 0 && setIndex(index - 1);
    } else if (draggedDistance < -swipeThreshold) {
      index + 1 < productAsset.length && setIndex(index + 1);
    }
  };

  return (
    <MotionConfig transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
      <div className="w-full h-full flex justify-center items-center">
        {/* ↓ Parent Container */}
        <div
          // Added ref to Parent Container so we can use
          // it's bounding box as dragConstraints
          // https://www.framer.com/motion/gestures/###dragconstraints
          ref={constraintsRef}
          // I added a max-w-[450px] and w-full for responsiveness and
          // so that it was easier to debug the carousel.
          className="relative w-full sm:w-auto aspect-[5/8] sm:max-h-[70vh] min-h-[300px] overflow-hidden"
        >
          {/* ↓ Draggable Container */}
          <motion.div
            style={{
              // Set the width to be 100% of the Parent Container
              // times the number of slides in the carousel. This
              // helps make sure the dragConstraints work as expected.
              width: `${productAsset.length * 100}%`,
            }}
            animate={{
              // Updated the x offset to be one slides width. Since
              // the width of the Draggable Container is
              // images.length * 100, each slide's width is
              // 100 / images.length.
              x: `-${index * (100 / productAsset.length)}%`,
            }}
            drag="x"
            dragElastic={1}
            dragConstraints={
              // Set the drag constraints to the Parent Container's
              // bounding box using a ref.
              // https://www.framer.com/motion/gestures/###dragconstraints
              constraintsRef
            }
            onDragEnd={(_, dragInfo: PanInfo) => dragEndHandler(dragInfo)}
            className="flex"
          >
            {/* ↓ Slides map */}
            {productAsset.map((productAsset, imageIndex) => (
              <div
                key={imageIndex}
                // Added a background color and made the image
                // slightly transparent to show background color
                // to help visualize the slides changing.
                className="aspect-[5/8] w-full "
                //style={{
                  // Add a hue rotate to based on slideIndex to
                  // give each slide a different color.
                 // filter: `hue-rotate(${
                 //   (360 / productAsset.length) * imageIndex
                 // }deg)`,
               // }}
              >
                <img
                  src={productAsset}
                  // Added opacity-50 to make the background bleed
                  // through to help visualize the slides changing.
                  className="object-cover pointer-events-none opacity-100"
                ></img>
              </div>
            ))}
          </motion.div>
          <div className="h-full">
          <AnimatePresence initial={false}>
            {index > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="absolute bottom-0 left-0 flex h-10 w-10 items-center justify-center"
                onClick={() => setIndex(index - 1)}
              >
                <DiscoPfeilLinks className="h-10 w-10 bg-discogray backdrop-blur-md text-white opacity-85 -ml-1 bg-blend-difference"/>
              </motion.button>
            )}
          </AnimatePresence>
          </div>
          <div className="h-full">
          <AnimatePresence initial={false}>
            {index + 1 < productAsset.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center"
                onClick={() => setIndex(index + 1)}
              >
                <DiscoPfeilRechts className="h-10 w-10 bg-discogray backdrop-blur-md text-white opacity-85 -mr-1 bg-blend-difference"/>
              </motion.button>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
