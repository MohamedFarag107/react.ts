import { TFunction } from "i18next";
import { Category } from "../../../types/category.type";
import * as yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Button, CircularProgress } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import CustomTextField from "../../ui/input/CustomTextField";
import UploadHandler from "../../ui/upload/UploadHandler";

import { toast } from "react-hot-toast";

import { Slider } from "../../../types/slider.type";
import {
  useCreateSliderMutation,
  useUpdateSliderMutation,
} from "../../../api/slider.api";

interface SliderOperationsProps {
  data?: Slider;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = (
  data?: Slider
): Omit<Slider, "createdAt" | "updatedAt"> => ({
  title_ar: data?.title_ar || "",
  title_en: data?.title_en || "",
  description_ar: data?.description_ar || "",
  description_en: data?.description_en || "",
  image: data?.image || "",
  _id: data?._id || "",
});

const validationSchema = (t: TFunction<"translation", undefined>) =>
  yup.object<Omit<Category, "createdAt" | "updatedAt">>({
    title_ar: yup
      .string()
      .min(3, t("min_text", { min: 3 }))
      .max(50, t("max_text", { max: 50 }))
      .trim()
      .optional(),
    title_en: yup
      .string()
      .min(3, t("min_text", { min: 3 }))
      .max(50, t("max_text", { max: 50 }))
      .trim()
      .optional(),
    description_ar: yup
      .string()
      .min(3, t("min_text", { min: 3 }))
      .max(50, t("max_text", { max: 50 }))
      .trim()
      .optional(),
    description_en: yup
      .string()
      .min(3, t("min_text", { min: 3 }))
      .max(50, t("max_text", { max: 50 }))
      .trim()
      .optional(),
    image: yup.string().url().required(t("required")),
  });

function BrandOperations({ setOpen, data }: SliderOperationsProps) {
  const [createSlider, { isLoading: createSliderLoading }] =
    useCreateSliderMutation();
  const [updateSlider, { isLoading: updateSliderLoading }] =
    useUpdateSliderMutation();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(t),
    onSubmit: (values, { resetForm }) => {
      const { _id, ...rest } = values;
      if (data) {
        updateSlider({ _id, body: rest })
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setOpen(false);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        createSlider(rest)
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
  const dir = language === "en" ? "ltr" : "rtl";
  return (
    <div className="h-full w-full" dir={dir}>
      {(createSliderLoading || updateSliderLoading) && (
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
                id="title_ar"
                name="title_ar"
                label={t("title_ar")}
                value={formik.values.title_ar}
                onChange={formik.handleChange}
                error={
                  formik.touched.title_ar && Boolean(formik.errors.title_ar)
                }
                helperText={formik.touched.title_ar && formik.errors.title_ar}
                onBlur={formik.handleBlur}
                variant="outlined"
              />
              <CustomTextField
                dir={dir}
                fullWidth
                id="title_en"
                name="title_en"
                label={t("title_en")}
                value={formik.values.title_en}
                onChange={formik.handleChange}
                error={
                  formik.touched.title_en && Boolean(formik.errors.title_en)
                }
                helperText={formik.touched.title_en && formik.errors.title_en}
                onBlur={formik.handleBlur}
                variant="outlined"
              />
              <CustomTextField
                fullWidth
                dir={dir}
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
              />
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
              disabled={createSliderLoading || updateSliderLoading}
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

export default BrandOperations;
