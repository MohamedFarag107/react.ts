import { useTranslation } from "react-i18next";
import { useAppSelector } from "../api/store";

function Loading() {
  const { logo } = useAppSelector((state) => state.global);
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-screen h-screen bg-white">
      <img className="w-40 h-40 gelatine" src={logo} alt={t("store")} />
    </div>
  );
}

export default Loading;
