import { Button } from "@mui/material";
import { Product } from "../../../types/product.type";
import { AiFillCloseSquare } from "react-icons/ai";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import * as yup from "yup";

interface ProductOperationsProps {
  data?: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = (data?: Product): Partial<Product> => ({
  name_ar: data?.name_ar || "",
  name_en: data?.name_en || "",
  price: data?.price || 0,
  images: data?.images || [],
  description_ar: data?.description_ar || "",
  description_en: data?.description_en || "",
  category:
    (data?.category &&
      typeof data?.category !== "string" &&
      data?.category._id) ||
    "",
  subCategory:
    (data?.subCategory &&
      typeof data?.subCategory !== "string" &&
      data?.subCategory._id) ||
    "",
  brand:
    (data?.brand && typeof data?.brand !== "string" && data?.brand._id) || "",
  discount: data?.discount || 0,
  _id: data?._id || "",
});

const validationSchema = (t: TFunction<"translation", undefined>) =>
  yup.object<Partial<Product>>({
    name_ar: yup.string().required(t("required")),
    name_en: yup.string().required(t("required")),
    images: yup
      .array()
      .min(1)
      .of(yup.string().required(t("required")))
      .required(t("required")),
    price: yup.number().min(1).required(t("required")),
    discount: yup.number().min(0).max(yup.ref("price")).required(t("required")),
    description_ar: yup.string().min(5).required(t("required")),
    description_en: yup.string().min(5).required(t("required")),
    category: yup.string().required(t("required")),
    subCategory: yup.string().required(t("required")),
    brand: yup.string().required(t("required")),
  });

function ProductOperations({ data, setOpen }: ProductOperationsProps) {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(t),
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          className="min-w-0 w-10 h-10 p-0 m-0"
        >
          <AiFillCloseSquare size={15} />
        </Button>
        {/* content */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* product text */}
          <div className="gap-4"></div>
          {/* product text */}
          {/* product images */}
          <div></div>
          {/* product images */}
        </div>
        {/* content */}
        {/* actions */}
        <div></div>
        {/* actions */}
      </div>
    </div>
  );
}

export default ProductOperations;
