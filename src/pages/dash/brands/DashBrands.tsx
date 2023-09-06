import DashBody from "../../../components/dash/body/DashBody";
import Brands from "../../../components/dash/brands/Brands";

function DashBrands() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <>
      <DashBody title="brands" onClick={handleClick}>
        <Brands />
      </DashBody>
    </>
  );
}

export default DashBrands;
