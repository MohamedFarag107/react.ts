import { useState } from "react";
import DashBody from "../../../components/dash/body/DashBody";
import Categories from "../../../components/dash/categories/Categories";
import MainModal from "../../../components/ui/modal/MainModal";
import CategoryOperations from "../../../components/dash/categories/CategoryOperations";

function DashCategories() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <MainModal   aria="add category" open={open} setOpen={setOpen}>
        <CategoryOperations setOpen={setOpen} />
      </MainModal>
      <DashBody title="categories" onClick={handleClick}>
        <Categories />
      </DashBody>
    </>
  );
}

export default DashCategories;
