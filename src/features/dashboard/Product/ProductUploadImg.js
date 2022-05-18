import { Box, Stack } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FUploadMultiFile } from "../../../components/form/FUploadMultiImage";
import MultiFilePreview from "../../../components/MultiFilePreview";

function ProductUpLoadImg({ handleDrop, handleRemoveAll, handleRemove }) {
  const { control } = useFormContext();
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <FUploadMultiFile
          name="imageFile"
          showPreview
          accept="image/*"
          maxSize={3145728}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
        />
      </Stack>
      <Controller
        name="imageUrls"
        control={control}
        render={({ field, fieldState: { error } }) => {
          const checkError = !!error && field.value?.length === 0;
          console.log(field);
          return (
            <MultiFilePreview
              showPreview
              files={field.value}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
            />
          );
        }}
      />
    </Box>
  );
}

export default ProductUpLoadImg;
