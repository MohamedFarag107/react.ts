import DashBody from "../../../components/dash/body/DashBody";
import Instalments from "../../../components/dash/instalments/Instalments";

 

function DashInstalments() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <DashBody title="instalments" onClick={handleClick}>
      <Instalments />
    </DashBody>
  );
}

export default DashInstalments