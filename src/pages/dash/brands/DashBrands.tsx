import { useState } from "react";
import DashBody from "../../../components/dash/body/DashBody";
import Brands from "../../../components/dash/brands/Brands";
import MainModal from "../../../components/ui/modal/MainModal";
import BrandOperations from "../../../components/dash/brands/BrandOperations";

function DashBrands() {
 const [open, setOpen] = useState(false);
 const handleClick = () => {
   setOpen(true);
 };
 return (
   <>
     <MainModal aria="add brand" open={open} setOpen={setOpen}>
       <BrandOperations setOpen={setOpen} />
     </MainModal>
     <DashBody title="brands" onClick={handleClick}>
       <Brands />
     </DashBody>
   </>
 );
}

export default DashBrands;
