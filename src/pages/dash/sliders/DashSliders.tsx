import DashBody from "../../../components/dash/body/DashBody";
import Sliders from "../../../components/dash/slider/Sliders";

function DashSliders() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <DashBody title="slider" onClick={handleClick}>
      <Sliders />
    </DashBody>
  );
}

export default DashSliders;
