import { ReactComponent as SVGWindows } from "@/assets/svg/windows.svg";
import { useState } from "react";

const Windows = () => {
  const [svgFill, setSvgFill] = useState("fill-white");

  return (
    <div
      className="w-12 h-full flex justify-center items-center hover:bg-neutral-700"
      onMouseOver={() => {
        setSvgFill("fill-sky-500");
      }}
      onMouseLeave={() => {
        setSvgFill("fill-white");
      }}
    >
      <SVGWindows width={20} height={20} className={svgFill} />
    </div>
  );
};

export default Windows;
