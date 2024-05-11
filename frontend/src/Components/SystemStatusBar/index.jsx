import { useContext } from "react";

import { HiCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

const SystemStatusBar = ({ text, status }) => {
  return (
    <div className="w-full h-8 bg-tertiary mt-2 py-1 px-4 rounded-md flex items-center justify-between">
      <h2 className="text-base text-primary">{text}</h2>
      {status && <HiCheck className="w-5 h-5 text-secondary" />}
      {!status && <HiOutlineX className="w-5 h-5 text-quartiary" />}
    </div>
  );
};

export default SystemStatusBar;
