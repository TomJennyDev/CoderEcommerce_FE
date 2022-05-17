import { Box } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import rehypeRaw from "rehype-raw";
function ProductDescription() {
  const { product } = useSelector((state) => state.product);

  return (
    <Box>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        children={product?.descriptions?.content}
      />
    </Box>
  );
}

export default ProductDescription;
