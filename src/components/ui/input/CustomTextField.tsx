import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import RTL from "../../../utils/RTL";

interface CustomTextFieldProps<
  Variant extends TextFieldVariants = TextFieldVariants,
> extends Omit<TextFieldProps, "variant"> {
  variant?: Variant;
  dir: "ltr" | "rtl";
}

function CustomTextField({ dir, ...rest }: CustomTextFieldProps) {
  return dir === "ltr" ? (
    <TextField {...rest} dir={dir} />
  ) : (
    <RTL>
      <TextField {...rest} dir={dir} />
    </RTL>
  );
}

export default CustomTextField;
