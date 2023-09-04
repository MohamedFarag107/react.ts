import { Button, CircularProgress } from "@mui/material";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useUploadMutation } from "../../../api/upload.api";
import clsx from "clsx";

interface UploadHandlerProps {
  onChange: (url: string) => void;
}

function UploadHandler({ onChange }: UploadHandlerProps) {
  const { t } = useTranslation();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [upload, { isLoading }] = useUploadMutation();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // check file type
    const type = file.type.split("/")[0];
    if (type !== "image") {
      toast.error(t("Invalid_file_type"));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    upload(formData)
      .unwrap()
      .then((res) => {
        onChange(res.data.url);
      });
  };
  return (
    <div className="flex flex-col items-center w-full relative">
      <div
        className={clsx(
          "absolute top-0 left-0 z-50 w-full h-full bg-black-600 bg-opacity-50 flex justify-center items-center",
          isLoading && "visible",
          !isLoading && "invisible"
        )}
      >
        <CircularProgress color="primary" />
      </div>
      <input
        ref={uploadRef}
        className="hidden"
        type="file"
        onChange={handleUpload}
      />
      <Button
        variant="outlined"
        className="min-w-0 w-80 aspect-square"
        onClick={() => uploadRef.current?.click()}
      >
        <img
          className="w-full h-full object-cover un-selectable"
          src="/images/placeholder.jpg"
          alt="placeholder"
        />
      </Button>
    </div>
  );
}

export default UploadHandler;
