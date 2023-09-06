import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Brand } from "../../../types/brand.type";
import { Category } from "../../../types/category.type";
import { SubCategory } from "../../../types/subCategory.type";
import { useTranslation } from "react-i18next";
import RTL from "../../../utils/RTL";

interface CustomSelectProps {
  dir: "ltr" | "rtl";
  data: Category[] | SubCategory[] | Brand[];
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  value: string;
  label: string;
  name: string;
  isError: boolean;
}

function CustomSelect({
  dir,
  data,
  onChange,
  onBlur,
  name,
  value,
  label,
  isError,
}: CustomSelectProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return dir === "ltr" ? (
    <FormControl fullWidth error={isError}>
      <InputLabel id={`${name}-select-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-id`}
        id={name}
        name={name}
        value={value}
        label={label}
        placeholder="Select"
        onChange={onChange}
        onBlur={onBlur}
      >
        <MenuItem dir={dir} className="capitalize" value="">
          {t("not_selected")}
        </MenuItem>
        {data.map((item) => (
          <MenuItem
            dir={dir}
            className="capitalize"
            key={item._id}
            value={item._id}
          >
            {language === "en" ? item.name_en : item.name_ar}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <RTL>
      <FormControl fullWidth error={isError}>
        <InputLabel id={`${name}-select-id`}>{label}</InputLabel>
        <Select
          labelId={`${name}-select-id`}
          id={name}
          name={name}
          value={value}
          label={label}
          placeholder="Select"
          onChange={onChange}
          onBlur={onBlur}
        >
          <MenuItem dir={dir} className="capitalize" value="">
            {t("not_selected")}
          </MenuItem>
          {data.map((item) => (
            <MenuItem
              dir={dir}
              className="capitalize"
              key={item._id}
              value={item._id}
            >
              {language === "en" ? item.name_en : item.name_ar}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </RTL>
  );
}

export default CustomSelect;
