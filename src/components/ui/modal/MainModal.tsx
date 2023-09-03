import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface MainModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  aria: string;
  fullScreen?: boolean;
}
function MainModal({
  open,
  setOpen,
  aria,
  children,
  fullScreen,
}: MainModalProps) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby={aria}
      maxWidth={"lg"}
      fullScreen={fullScreen}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default MainModal;
