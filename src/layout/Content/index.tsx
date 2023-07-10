import DesktopIcon from "@/components/DesktopIcon";
import {
  addFolder,
  onOffFolderModal,
  selectFolders,
  setFolderModalStyle,
} from "@/store/folders/foldersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { v4 as uuidV4 } from "uuid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import Modal from "@/components/Modal";

type MousePosition = {
  mouseX: number | null;
  mouseY: number | null;
};

const Content = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const [currentDeskTopIcon, setCurrentDeskTopIcon] = useState<string | null>(
    null
  );
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
      onClick={() => {
        setCurrentDeskTopIcon(null);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setMousePosition({
          mouseX: e.clientX - 2,
          mouseY: e.clientY - 4,
        });
      }}
    >
      {folders.map((item) => (
        <DesktopIcon
          key={item.id}
          clicked={currentDeskTopIcon === item.id}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentDeskTopIcon(item.id);
          }}
          onDoubleClick={() => {
            dispatch(onOffFolderModal({ id: item.id, modalOpen: true }));
          }}
        />
      ))}
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
            dispatch(
              addFolder({
                folderName: "文件夹",
                modalOpen: false,
                id: uuidV4(),
              })
            );
            handleClose();
          }}
        >
          新建文件夹
        </MenuItem>
      </Menu>
      {folders.map((folder) => {
        if (folder.modalOpen) {
          return (
            <Modal
              key={folder.id}
              id={folder.id}
              modalSize={folder.modalSize}
              modalPosition={folder.modalPosition}
              onResize={(size, position) => {
                dispatch(
                  setFolderModalStyle({
                    id: folder.id,
                    modalSize: size,
                    modalPosition: position,
                  })
                );
              }}
              onClose={() => {
                dispatch(onOffFolderModal({ id: folder.id, modalOpen: false }));
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Content;
