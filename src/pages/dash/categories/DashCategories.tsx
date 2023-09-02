import DashBody from "../../../components/dash/body/DashBody";
import Categories from "../../../components/dash/categories/Categories";

function DashCategories() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <DashBody title="categories" onClick={handleClick}>
      <Categories />
    </DashBody>
  );
}

export default DashCategories;
