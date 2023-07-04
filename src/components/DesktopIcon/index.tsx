import { ReactComponent as SVGFolder } from "@/assets/svg/folder.svg";

const DesktopIcon = () => {
  return (
    <div className="w-20 h-20 flex flex-col justify-center items-center hover:bg-blue-300/20 hover:border-solid hover:border">
      <SVGFolder width={50} height={50} />
      <div
        className="text-xs text-white"
        style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
      >
        文件夹
      </div>
    </div>
  );
};

export default DesktopIcon;
