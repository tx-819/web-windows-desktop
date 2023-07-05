import { ReactComponent as SVGFolder } from "@/assets/svg/folder.svg";
import classNames from "classnames";
import React, { useMemo } from "react";

type DesktopIconProps = {
  clicked: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
};

const DesktopIcon: React.FC<DesktopIconProps> = (props) => {
  const { clicked, onClick, onDoubleClick } = props;

  const className = useMemo(() => {
    if (clicked) {
      return classNames("bg-blue-300/20");
    }
    return classNames('border-transparent');
  }, [clicked]);

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-20 h-20 hover:bg-blue-300/20 border " +
        className
      }
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <SVGFolder width={50} height={50} />
      <div
        className="text-xs text-center text-white"
        style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
      >
        文件夹
      </div>
    </div>
  );
};

export default DesktopIcon;
