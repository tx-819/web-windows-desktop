import { ReactComponent as SVGWindows } from "@/assets/svg/windows.svg";
import { useState } from "react";
import WindowsMenu from "@/components/WindowsMenu";

type WindowsProps = {
  menuOpen: boolean;
  handleMenuOpen: (menuOpen: boolean) => void
};

const Windows: React.FC<WindowsProps> = (props) => {
  const { menuOpen, handleMenuOpen } = props;
  const [svgFill, setSvgFill] = useState("fill-white");

  return (
    <>
      <div
        className="flex items-center justify-center w-12 h-full hover:bg-neutral-700"
        onMouseOver={() => {
          setSvgFill("fill-sky-500");
        }}
        onMouseLeave={() => {
          setSvgFill("fill-white");
        }}
        onClick={() => {
          handleMenuOpen(!menuOpen);
        }}
      >
        <SVGWindows width={20} height={20} className={svgFill} />
      </div>
      <WindowsMenu open={menuOpen} />
    </>
  );
};

export default Windows;
