import { useAppSelector } from "../api";

function Loading() {
  const { logo, name_ar, name_en } = useAppSelector((state) => state.global);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <img
        className="w-40 h-40 gelatine"
        src={logo}
        alt={`${name_en} - ${name_ar}`}
      />
    </div>
  );
}

export default Loading;
