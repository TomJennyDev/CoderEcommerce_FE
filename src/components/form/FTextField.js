import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { value, ...restfield } = field;
        return (
          <TextField
            variant="standard"
            value={value || ""}
            {...restfield}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
          />
        );
      }}
    />
  );
}

export default FTextField;
