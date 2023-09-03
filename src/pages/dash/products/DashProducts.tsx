import { useState } from "react";
import DashBody from "../../../components/dash/body/DashBody";
import Products from "../../../components/dash/products/Products";
import MainModal from "../../../components/ui/modal/MainModal";
import ProductOperations from "../../../components/dash/products/ProductOperations";

function DashProducts() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <MainModal fullScreen aria="add product" open={open} setOpen={setOpen}>
        <ProductOperations setOpen={setOpen} />
      </MainModal>
      <DashBody title="products" onClick={handleClick}>
        <Products />
      </DashBody>
    </>
  );
}

export default DashProducts;
