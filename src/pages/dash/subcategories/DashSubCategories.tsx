import DashBody from "../../../components/dash/body/DashBody";
import SubCategories from "../../../components/dash/subCategories/SubCategories";

function DashSubCategories() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <DashBody title="subcategories" onClick={handleClick}>
      <SubCategories />
    </DashBody>
  );
}

export default DashSubCategories;
