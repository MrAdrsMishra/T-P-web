import { MoonIcon, SunIcon } from "lucide-react";
import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isLight, setLight] = useState(true);
  return (
    <div
      className="w-14 h-5 border-2   rounded-xl  border-primary-200"
      onClick={() => setLight(!isLight)}
    >
      <div
        id="icon"
        className={`  transition-all duration-700  
              ${isLight ? "translate-x-0" : "translate-x-8"}`}
      >
        {isLight ? <MoonIcon size={18} /> : <SunIcon size={18} />}
      </div>
    </div>
  );
};

export default ToggleSwitch;
