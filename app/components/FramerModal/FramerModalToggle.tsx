
import * as React from "react";
import { Settings2 } from "lucide-react";

interface FramerModalToggleProps {
  menuOpen: boolean;
  setMenuOpen: (_: boolean) => void;
}

const FramerModalToggle: React.FC<FramerModalToggleProps> = ({
  menuOpen,
  setMenuOpen,
}) => {

  return (
<Settings2 className="w-8 h-8 cursor-pointer backdrop-blur-md rounded-full p-1" onClick={() => setMenuOpen(!menuOpen)}/>
  );
};

export default FramerModalToggle;
