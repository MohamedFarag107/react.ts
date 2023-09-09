import { useState } from "react";
import DashBody from "../../../components/dash/body/DashBody";
import Sliders from "../../../components/dash/slider/Sliders";
import MainModal from "../../../components/ui/modal/MainModal";
import SliderOperations from "../../../components/dash/slider/SliderOperations";

function DashSliders() {
  const [open, setOpen] = useState(false);
 const handleClick = () => {
   setOpen(true);
 };
 return (
   <>
     <MainModal aria="add slider" open={open} setOpen={setOpen}>
       <SliderOperations setOpen={setOpen} />
     </MainModal>
     <DashBody title="slider" onClick={handleClick}>
       <Sliders />
     </DashBody>
   </>
 );
}

export default DashSliders;
