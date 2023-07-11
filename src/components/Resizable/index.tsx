import React, { ReactNode, useRef } from "react";

type ResizableProps = {
  height?: number;
  width?: number;
  children?: ReactNode;
  onResize?: (
    size: { width: number; height: number },
    position?: { x: number; y: number }
  ) => void;
};

type Position =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topLeft"
  | "topRight"
  | "bottomRight"
  | "bottomLeft";

let mouseDownClient: { x: number; y: number } | null = null;

const Resizable: React.FC<ResizableProps> = (props) => {
  const { width, height, children, onResize } = props;
  const ref = useRef<HTMLDivElement>(null);

  const topMove = (e: MouseEvent) => {
    if (!ref.current || !width || !height || !mouseDownClient) return;
    const { left } = ref.current.getBoundingClientRect();
    const { clientY } = e;
    onResize &&
      onResize(
        { width: width, height: height - (clientY - mouseDownClient.y) },
        { x: left, y: clientY }
      );
  };

  const rightMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { clientX } = e;
    onResize &&
      onResize({ width: width + (clientX - mouseDownClient.x), height });
  };

  const bottomMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { clientY } = e;
    onResize &&
      onResize({ width, height: height + (clientY - mouseDownClient.y) });
  };

  const leftMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { top } = ref.current.getBoundingClientRect();
    const { clientX } = e;
    onResize &&
      onResize(
        { width: width - (clientX - mouseDownClient.x), height },
        { x: clientX, y: top }
      );
  };

  const topLeftMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { clientX, clientY } = e;
    onResize &&
      onResize(
        {
          width: width - (clientX - mouseDownClient.x),
          height: height - (clientY - mouseDownClient.y),
        },
        { x: clientX, y: clientY }
      );
  };

  const topRightMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { clientX, clientY } = e;
    const { left } = ref.current.getBoundingClientRect();
    onResize &&
      onResize(
        {
          width: width + (clientX - mouseDownClient.x),
          height: height - (clientY - mouseDownClient.y),
        },
        { x: left, y: clientY }
      );
  };

  const bottomRightMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { clientX, clientY } = e;
    onResize &&
      onResize({
        width: width + (clientX - mouseDownClient.x),
        height: height + (clientY - mouseDownClient.y),
      });
  };

  const bottomLeftMove = (e: MouseEvent) => {
    if (!ref.current || !height || !width || !mouseDownClient) return;
    const { clientX, clientY } = e;
    const { top } = ref.current.getBoundingClientRect();
    onResize &&
      onResize(
        {
          width: width - (clientX - mouseDownClient.x),
          height: height + (clientY - mouseDownClient.y),
        },
        { x: clientX, y: top }
      );
  };

  const mouseMove = (event: React.MouseEvent, position: Position) => {
    const { clientX, clientY } = event;
    mouseDownClient = { x: clientX, y: clientY };
    document.onmousemove = (e) => {
      switch (position) {
        case "top":
          topMove(e);
          break;
        case "right":
          rightMove(e);
          break;
        case "bottom":
          bottomMove(e);
          break;
        case "left":
          leftMove(e);
          break;
        case "topLeft":
          topLeftMove(e);
          break;
        case "topRight":
          topRightMove(e);
          break;
        case "bottomRight":
          bottomRightMove(e);
          break;
        case "bottomLeft":
          bottomLeftMove(e);
          break;
      }
    };
  };

  const mouseUp = () => {
    document.onmousemove = null;
  };

  return (
    <div
      className="relative"
      ref={ref}
      style={{ width: width + "px", height: height + "px" }}
    >
      <div
        className="absolute -top-2 left-2 h-4 w-[calc(100%-1rem)] cursor-ns-resize"
        onMouseDown={(e) => {
          mouseMove(e, "top");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute -right-2 w-4 h-[calc(100%-1rem)] top-2 cursor-ew-resize"
        onMouseDown={(e) => {
          mouseMove(e, "right");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute -bottom-2 left-2 h-4 w-[calc(100%-1rem)] cursor-ns-resize"
        onMouseDown={(e) => {
          mouseMove(e, "bottom");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute -left-2 w-4 h-[calc(100%-1rem)] top-2 cursor-ew-resize"
        onMouseDown={(e) => {
          mouseMove(e, "left");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute w-4 h-4 -left-2 -top-2 cursor-nwse-resize"
        onMouseDown={(e) => {
          mouseMove(e, "topLeft");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute w-4 h-4 -right-2 -top-2 cursor-nesw-resize"
        onMouseDown={(e) => {
          mouseMove(e, "topRight");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute w-4 h-4 -right-2 -bottom-2 cursor-nwse-resize"
        onMouseDown={(e) => {
          mouseMove(e, "bottomRight");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      <div
        className="absolute w-4 h-4 -left-2 -bottom-2 cursor-nesw-resize"
        onMouseDown={(e) => {
          mouseMove(e, "bottomLeft");
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      />
      {children}
    </div>
  );
};

export default Resizable;
