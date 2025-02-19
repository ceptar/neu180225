import React from "react";
import FramerModalToggle from "./FramerModalToggle";
import { AnimatePresence, motion } from "framer-motion";
import FramerModalOverlay from "./FramerModalOverlay";


interface FramerModalProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  results: any[];
  filterIds: string[];
 updateFilterIds: (ids: string[]) => void;
}

const FramerModal: React.FC<FramerModalProps> = ({ 
  menuOpen, 
  setMenuOpen, 
  results, 
  filterIds, 
  updateFilterIds 
}) => {

  return (
<div>
    <AnimatePresence>{menuOpen && <FramerModalOverlay
          results={results}  // Access the received results prop
          filterIds={filterIds}  // Access the received filterIds prop
          updateFilterIds={updateFilterIds} // Access the received setFilterIds function 
    />}</AnimatePresence>

    <div className="z-[100] fixed top-3 right-0 mr-5 mb-8 ">

      <FramerModalToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
    </div>
    </div>
  );
};

export default FramerModal;
