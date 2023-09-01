import { useParams } from "react-router-dom";

function Category() {
  const params = useParams().id;

  return <div>{params}</div>;
}

export default Category;
