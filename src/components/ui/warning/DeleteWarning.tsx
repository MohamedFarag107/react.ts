import { Button, CircularProgress, Typography } from "@mui/material";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { BsExclamationTriangleFill } from "react-icons/bs";

interface DeleteWarningProps {
  title: string;
  subtitle: string;
  onYes: () => void;
  onNo: () => void;
  isLoading: boolean;
}

function DeleteWarning({
  onNo,
  onYes,
  subtitle,
  title,
  isLoading,
}: DeleteWarningProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center">
      <div className="flex justify-center items-center bg-danger/20 rounded-full h-16 w-16">
        <BsExclamationTriangleFill size={30} className="text-danger" />
      </div>
      <Typography variant="h4" className="text-[#36434d] capitalize font-bold">
        {t("delete_warning.title", { name: title })}
      </Typography>
      <Typography
        variant="body1"
        color="error"
        className="text-[#36434d] capitalize leading-3"
      >
        {t("delete_warning.subtitle", {
          name: subtitle.substring(0, 20) + " ..",
        })}
      </Typography>
      <Typography variant="body1" className="text-[#36434d] capitalize ">
        {t("delete_warning.sure")}
      </Typography>

      <div
        className={clsx(
          "flex gap-4 justify-center items-center",
          language === "en" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <Button
          variant="outlined"
          color="error"
          className="capitalize"
          onClick={onNo}
          disabled={isLoading}
        >
          {t("delete_warning.no")}
        </Button>
        <Button
          variant="contained"
          color="error"
          className={clsx(
            "capitalize gap-3",
            language === "en" ? "flex-row" : "flex-row-reverse"
          )}
          onClick={() => {
            isLoading ? null : onYes();
          }}
          disabled={isLoading}
        >
          {isLoading && <CircularProgress color="inherit" size={15} />}
          {t("delete_warning.yes")}
        </Button>
      </div>
    </div>
  );
}

export default DeleteWarning;
