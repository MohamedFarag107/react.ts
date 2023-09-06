import { useState } from "react";
import DashBody from "../../../components/dash/body/DashBody"; 
import SubCategoryOperations from "../../../components/dash/subCategories/SubCategoryOperations";
import MainModal from "../../../components/ui/modal/MainModal";
import SubCategories from "../../../components/dash/subCategories/SubCategories";

function DashSubCategories() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <MainModal   aria="add category" open={open} setOpen={setOpen}>
        <SubCategoryOperations setOpen={setOpen} />
      </MainModal>
      <DashBody title="subcategories" onClick={handleClick}>
        <SubCategories />
      </DashBody>
    </>
  );
}

export default DashSubCategories;
