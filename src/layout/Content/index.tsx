import DesktopIcon from "@/components/DesktopIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";

type MousePosition = {
  mouseX: number | null;
  mouseY: number | null;
};

const Content = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    mouseX: null,
    mouseY: null,
  });

  const handleClose = () => {
    setMousePosition({
      mouseX: null,
      mouseY: null,
    });
  };

  return (
    <div
      className="flex-1 bg-neutral-300"
      onContextMenu={(e) => {
        e.preventDefault();
        setMousePosition({
          mouseX: e.clientX - 2,
          mouseY: e.clientY - 4,
        });
      }}
    >
      <DesktopIcon />
      <Menu
        keepMounted
        open={mousePosition.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mousePosition.mouseY !== null && mousePosition.mouseX !== null
            ? { top: mousePosition.mouseY, left: mousePosition.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
      </Menu>
    </div>
  );
};

export default Content;
