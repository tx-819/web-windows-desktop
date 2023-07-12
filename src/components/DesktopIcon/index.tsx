import { ReactComponent as SVGFolder } from "@/assets/svg/folder.svg";
import { setFolderName, toggleEdit } from "@/store/folders/foldersSlice";
import { useAppDispatch } from "@/store/hooks";
import { Menu, MenuItem } from "@material-ui/core";
import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";

type DesktopIconProps = {
  id: string;
  clicked: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  isEdit?: boolean;
  folderName: string;
};

type MousePosition = {
  mouseX: number | null;
  mouseY: number | null;
};

const DesktopIcon: React.FC<DesktopIconProps> = (props) => {
  const {
    id,
    clicked,
    onClick,
    onDoubleClick,
    isEdit = false,
    folderName,
  } = props;
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (ref.current && isEdit) {
      ref.current.focus();
    }
  }, [isEdit, ref]);

  const className = useMemo(() => {
    if (clicked) {
      return classNames("bg-blue-300/20");
    }
    return classNames("border-transparent");
  }, [clicked]);

  return (
    <>
      <div
        className={
          "flex flex-col items-center justify-center w-20 h-20 hover:bg-blue-300/20 border " +
          className
        }
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setMousePosition({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          });
        }}
      >
        <SVGFolder width={40} height={40} />
        {isEdit ? (
          <input
            className="w-16 text-xs rounded-none outline-none"
            ref={ref}
            value={folderName}
            onBlur={(e) => {
              dispatch(toggleEdit({ id, isEdit: false }));
            }}
            onChange={(e) => {
              dispatch(setFolderName({ id, folderName: e.target.value }));
            }}
          />
        ) : (
          <div
            className="text-xs text-center text-white line-clamp-2"
            style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
          >
            {folderName}
          </div>
        )}
      </div>
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
        <MenuItem
          onClick={() => {
            dispatch(toggleEdit({ id, isEdit: true }));
            handleClose();
          }}
          onContextMenu={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <span className="text-sm">重命名</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DesktopIcon;
