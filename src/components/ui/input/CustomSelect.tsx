import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Brand } from "../../../types/brand.type";
import { Category } from "../../../types/category.type";
import { SubCategory } from "../../../types/subCategory.type";
import { useTranslation } from "react-i18next";

interface CustomSelectProps {
  data: Category[] | SubCategory[] | Brand[];
  setFieldValue: (key: string, value: any) => void;
  value: string;
  label: string;
  key: string;
}

function CustomSelect({
  data,
  setFieldValue,
  key,
  value,
  label,
}: CustomSelectProps) {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div>
      <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={label}
        onChange={(value) => {
          setFieldValue(key, value);
        }}
      >
        {data.map((item) => (
          <MenuItem value={item._id}>
            {language === "en" ? item.name_en : item.name_ar}
          </MenuItem>
        ))}
        <MenuItem value={10}>Ten</MenuItem>
      </Select>
      <FormHelperText>With label + helper text</FormHelperText>
    </div>
  );
}

export default CustomSelect;
