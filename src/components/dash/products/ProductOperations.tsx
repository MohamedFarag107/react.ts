import { Button } from "@mui/material";
import { Product } from "../../../types/product.type";
import { AiFillCloseSquare } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import * as yup from "yup";
import CustomTextField from "../../ui/input/CustomTextField";
import UploadHandler from "../../ui/upload/UploadHandler";

interface ProductOperationsProps {
  data?: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = (
  data?: Product
): Omit<Product, "rating" | "sold" | "piecesSold"> => ({
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
  yup.object<Omit<Product, "rating" | "sold" | "piecesSold">>({
    name_ar: yup.string().required(t("required")),
    name_en: yup.string().required(t("required")),
    images: yup
      .array()
      .min(1, t("min_images", { min: 1 }))
      .of(yup.string().required(t("required")))
      .required(t("required")),
    price: yup.number().min(1).required(t("required")),
    discount: yup.number().min(0).max(yup.ref("price")).required(t("required")),
    description_ar: yup
      .string()
      .min(5, t("min_description", { min: 5 }))
      .required(t("required")),
    description_en: yup
      .string()
      .min(5, t("min_description", { min: 5 }))
      .required(t("required")),
    category: yup.string().required(t("required")),
    subCategory: yup.string().required(t("required")),
    brand: yup.string().required(t("required")),
  });

export type FormikType<T> = FormikProps<T>;
export type FormValues = Omit<Product, "rating" | "sold" | "piecesSold">;

const SelectedImages = ({
  images,
  formik,
}: {
  images: string[];
  formik: FormikType<FormValues>;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-4 w-full">
      {images.map((image, index) => (
        <div key={index} className="relative shadow-lg">
          <img
            className="w-full aspect-square object-contain un-selectable"
            src={image}
            alt="uploaded"
          />
          <Button
            onClick={() => {
              formik.setFieldValue(
                "images",
                formik.values.images.filter((value) => value !== image)
              );
            }}
            variant="outlined"
            color="error"
            className="min-w-0 w-10 h-10 p-0 m-0 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
          >
            <AiFillCloseSquare size={30} className="text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
};

function ProductOperations({ data, setOpen }: ProductOperationsProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(t),
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const dir = language === "en" ? "ltr" : "rtl";
  return (
    <div className="h-full w-full" dir={dir}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end items-center">
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            className="min-w-0 w-10 h-10 p-0 m-0"
          >
            <AiFillCloseSquare size={15} />
          </Button>
        </div>
        {/* content */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {/* product text */}
          <div className="flex lg:col-span-2 flex-col gap-3">
            <CustomTextField
              fullWidth
              dir={dir}
              id="name_ar"
              name="name_ar"
              label={t("name_ar")}
              value={formik.values.name_ar}
              onChange={formik.handleChange}
              error={formik.touched.name_ar && Boolean(formik.errors.name_ar)}
              helperText={formik.touched.name_ar && formik.errors.name_ar}
              onBlur={formik.handleBlur}
              variant="outlined"
            />
            <CustomTextField
              dir={dir}
              fullWidth
              id="name_en"
              name="name_en"
              label={t("name_en")}
              value={formik.values.name_en}
              onChange={formik.handleChange}
              error={formik.touched.name_en && Boolean(formik.errors.name_en)}
              helperText={formik.touched.name_en && formik.errors.name_en}
              onBlur={formik.handleBlur}
              variant="outlined"
            />
            <CustomTextField
              dir={dir}
              fullWidth
              id="description_ar"
              name="description_ar"
              label={t("description_ar")}
              value={formik.values.description_ar}
              onChange={formik.handleChange}
              error={
                formik.touched.description_ar &&
                Boolean(formik.errors.description_ar)
              }
              helperText={
                formik.touched.description_ar && formik.errors.description_ar
              }
              onBlur={formik.handleBlur}
              variant="outlined"
              color="primary"
              multiline
              maxRows={10}
            />
            <CustomTextField
              dir={dir}
              fullWidth
              id="description_en"
              name="description_en"
              label={t("description_en")}
              value={formik.values.description_en}
              onChange={formik.handleChange}
              error={
                formik.touched.description_en &&
                Boolean(formik.errors.description_en)
              }
              helperText={
                formik.touched.description_en && formik.errors.description_en
              }
              onBlur={formik.handleBlur}
              variant="outlined"
              color="primary"
              multiline
              maxRows={10}
            />
          </div>
          {/* product text */}
          {/* product images */}
          <div>
            {formik.errors.images && (
              <div className="text-red-500 text-center pb-2 capitalize">
                {formik.errors.images}
              </div>
            )}
            <UploadHandler
              onChange={(file) => {
                formik.setFieldValue("images", [...formik.values.images, file]);
              }}
            />
            <SelectedImages images={formik.values.images} formik={formik} />
          </div>
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
