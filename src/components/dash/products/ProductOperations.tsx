import { Button, CircularProgress } from "@mui/material";
import { Product } from "../../../types/product.type";
import { AiFillCloseSquare } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import * as yup from "yup";
import CustomTextField from "../../ui/input/CustomTextField";
import UploadHandler from "../../ui/upload/UploadHandler";
import { useGetAllCategoriesQuery } from "../../../api/category.api";
import CustomSelect from "../../ui/input/CustomSelect";
import { useGetAllSubCategoriesQuery } from "../../../api/subCategory.api";
import { useGetAllBrandsQuery } from "../../../api/brand.api";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../api/product.api";
import { toast } from "react-hot-toast";

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
  category: data?.category
    ? typeof data?.category === "string"
      ? data?.category
      : data?.category._id
    : "",
  subCategory: data?.subCategory
    ? typeof data?.subCategory === "string"
      ? data?.subCategory
      : data?.subCategory._id
    : "",
  brand: data?.brand
    ? typeof data?.brand === "string"
      ? data?.brand
      : data?.brand._id
    : "",
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
    price: yup.number().min(1, t("price_error")).required(t("required")),
    discount: yup
      .number()
      .min(0, t("discount_error_min"))
      .max(yup.ref("price"), t("discount_error_max"))
      .required(t("required")),
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
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();
  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(t),
    onSubmit: (values) => {
      const { _id, ...rest } = values;
      if (data) {
        updateProduct({ _id, body: rest })
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setOpen(false);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        createProduct(rest)
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setOpen(false);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    },
  });

  const { data: categories, isSuccess: categorySuccess } =
    useGetAllCategoriesQuery({
      query: `?limit=1000`,
    });
  const { data: subCategories, isSuccess: subCategoriesSuccess } =
    useGetAllSubCategoriesQuery({
      query: `?limit=1000`,
    });
  const { data: brands, isSuccess: brandsSuccess } = useGetAllBrandsQuery({
    query: `?limit=1000`,
  });

  const dir = language === "en" ? "ltr" : "rtl";
  return (
    <div className="h-full w-full" dir={dir}>
      {(createProductLoading || updateProductLoading) && (
        <div className="absolute inset-0 bg-black-100/70 z-50 flex justify-center items-center">
          <CircularProgress color="primary" className="opacity-100" />
        </div>
      )}
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
        <form onSubmit={formik.handleSubmit}>
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
              {categorySuccess && (
                <CustomSelect
                  dir={dir}
                  data={categories?.data || []}
                  label={t("categories")}
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    typeof formik.values.category === "string"
                      ? formik.values.category
                      : formik.values.category._id
                  }
                  isError={
                    formik.touched?.category && formik.errors?.category
                      ? true
                      : false
                  }
                />
              )}
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-start pb-2 capitalize">
                  {formik.errors.category}
                </div>
              )}
              {subCategoriesSuccess && (
                <CustomSelect
                  dir={dir}
                  data={subCategories?.data || []}
                  label={t("subcategories")}
                  name="subCategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    typeof formik.values.subCategory === "string"
                      ? formik.values.subCategory
                      : formik.values.subCategory._id
                  }
                  isError={
                    formik.touched?.subCategory && formik.errors?.subCategory
                      ? true
                      : false
                  }
                />
              )}
              {formik.touched.subCategory && formik.errors.subCategory && (
                <div className="text-red-500 text-start pb-2 capitalize">
                  {formik.errors.subCategory}
                </div>
              )}
              {brandsSuccess && (
                <CustomSelect
                  dir={dir}
                  data={brands?.data || []}
                  label={t("brands")}
                  name="brand"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    typeof formik.values.brand === "string"
                      ? formik.values.brand
                      : formik.values.brand._id
                  }
                  isError={
                    formik.touched?.brand && formik.errors?.brand ? true : false
                  }
                />
              )}
              {formik.touched.brand && formik.errors.brand && (
                <div className="text-red-500 text-start pb-2 capitalize">
                  {formik.errors.brand}
                </div>
              )}
              <CustomTextField
                dir={dir}
                fullWidth
                id="price"
                name="price"
                label={t("price")}
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                onBlur={formik.handleBlur}
                type="number"
                variant="outlined"
              />
              <CustomTextField
                dir={dir}
                fullWidth
                id="discount"
                name="discount"
                label={t("discount")}
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
                onBlur={formik.handleBlur}
                type="number"
                variant="outlined"
              />
            </div>
            {/* product text */}
            {/* product images */}
            <div className="flex flex-col gap-3">
              {formik.touched.images && formik.errors.images && (
                <div className="text-red-500 text-center pb-2 capitalize">
                  {formik.errors.images}
                </div>
              )}
              <UploadHandler
                onChange={(file) => {
                  formik.setFieldValue("images", [
                    ...formik.values.images,
                    file,
                  ]);
                }}
              />
              <SelectedImages images={formik.values.images} formik={formik} />
            </div>
            {/* product images */}
          </div>
          {/* content */}
          {/* actions */}
          <div className="flex justify-center items-center py-6">
            <Button
              variant="contained"
              color="primary"
              className="py-2 px-8"
              type="submit"
            >
              {data ? t("edit") : t("create")}
            </Button>
          </div>
          {/* actions */}
        </form>
      </div>
    </div>
  );
}

export default ProductOperations;
