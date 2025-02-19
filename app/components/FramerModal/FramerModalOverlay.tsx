import { motion } from "framer-motion";
import React from "react";
import { FacetValueFilters } from "~/app/components/FacetFilters/FacetValueFilters";

import { easings } from "~/utils/animations";

const FramerModalOverlay = ({
  results,
  filterIds,
  updateFilterIds
}: {
  results: any[];
  filterIds: string[];
  updateFilterIds: (ids: string[]) => void;
}) => {
  return (
    <motion.div
    className="fixed left-0 bottom-0 h-full w-full md:w-[50vw] bg-background/85 backdrop-blur-[4px] justify-end isolate z-[100]"
    initial={{ x: "-100%" }}
      animate={{
        x: 0,
        transition: { duration: 1, ease: easings.easeOutQuart },
      }}
      exit={{ x: "-100%", transition: { duration: 0.3 } }}
      >
      <motion.div>
        <FacetValueFilters
          results={results}
          filterIds={filterIds}
          updateFilterIds={updateFilterIds}
        />
      </motion.div>
    </motion.div>
  );
};

export default FramerModalOverlay;
