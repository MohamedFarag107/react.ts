import DashBody from "../../../components/dash/body/DashBody";
import Products from "../../../components/dash/products/Products";

function DashProducts() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <DashBody title="products" onClick={handleClick}>
      <Products />
    </DashBody>
  );
}

export default DashProducts;
