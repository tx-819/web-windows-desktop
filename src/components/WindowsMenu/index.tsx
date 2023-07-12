import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { createPortal } from "react-dom";

type WindowsMenuProps = {
  open: boolean;
};

const WindowsMenu: React.FC<WindowsMenuProps> = (props) => {
  const { open } = props;
  const springs = useSpring({ y: open ? 0 : 500, opacity: open ? 1 : 0 });

  return (
    <animated.div
      style={springs}
      className="w-1/4 h-[500px] fixed left-0 bottom-10 bg-zinc-800"
    >
      Hello World
    </animated.div>
  );
};

const Portal = (props: WindowsMenuProps) => {
  return createPortal(<WindowsMenu {...props} />, document.body);
};

export default Portal;
