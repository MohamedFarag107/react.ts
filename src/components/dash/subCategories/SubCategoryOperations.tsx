import { TFunction } from "i18next";
import { SubCategory } from "../../../types/subCategory.type";
import * as yup from "yup";
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "../../../api/subCategory.api";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { Button, CircularProgress } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import CustomTextField from "../../ui/input/CustomTextField";
import UploadHandler from "../../ui/upload/UploadHandler";
import { useGetAllCategoriesQuery } from "../../../api/category.api";
import CustomSelect from "../../ui/input/CustomSelect";

interface SubCategoryOperationsProps {
  data?: SubCategory;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = (
  data?: SubCategory
): Omit<SubCategory, "createdAt" | "updatedAt"> => ({
  name_ar: data?.name_ar || "",
  name_en: data?.name_en || "",
  category: data?.category || "",
  image: data?.image || "",
  _id: data?._id || "",
});

const validationSchema = (t: TFunction<"translation", undefined>) =>
  yup.object<Omit<SubCategory, "createdAt" | "updatedAt">>({
    name_ar: yup
      .string()
      .min(3, t("min_text", { min: 3 }))
      .max(50, t("max_text", { max: 50 }))
      .trim()
      .required(t("required")),
    name_en: yup
      .string()
      .min(3, t("min_text", { min: 3 }))
      .max(50, t("max_text", { max: 50 }))
      .trim()
      .required(t("required")),
    image: yup.string().url().optional(),
    category: yup.string().length(24).required(t("required")),
  });

function SubCategoryOperations({ data, setOpen }: SubCategoryOperationsProps) {
  const [createSubCategory, { isLoading: createSubCategoryLoading }] =
    useCreateSubCategoryMutation();
  const [updateSubCategory, { isLoading: updateSubCategoryLoading }] =
    useUpdateSubCategoryMutation();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(t),
    onSubmit: (values, { resetForm }) => {
      const { _id, image, ...rest } = values;
      const subCategoryData = image ? { ...rest, image } : rest;
      if (data) {
        updateSubCategory({ _id, data: subCategoryData })
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setOpen(false);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        createSubCategory(subCategoryData)
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setOpen(false);
            resetForm();
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

  const dir = language === "en" ? "ltr" : "rtl";

  return (
    <div className="h-full w-full" dir={dir}>
      {(createSubCategoryLoading || updateSubCategoryLoading) && (
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

              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-start pb-2 capitalize">
                  {formik.errors.category}
                </div>
              )}
            </div>
            {/* product image */}
            <div className="flex flex-col gap-3">
              <UploadHandler
                value={formik.values.image}
                onChange={(file) => {
                  formik.setFieldValue("image", file);
                }}
                error={
                  formik.touched.image && formik.errors.image ? true : false
                }
              />
              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500 text-center pb-2 capitalize">
                  {formik.errors.image}
                </div>
              )}
            </div>
            {/* product images */}
          </div>
          {/* actions */}
          <div className="flex justify-center items-center py-6">
            <Button
              variant="contained"
              color="primary"
              className="py-2 px-8"
              type="submit"
              disabled={createSubCategoryLoading || updateSubCategoryLoading}
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

export default SubCategoryOperations;
