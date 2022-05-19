import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import rehypeRaw from "rehype-raw";
import { useIsOverflow } from "../../hooks/useIsOverFlow";

function ProductDescription() {
  const [show, setShow] = useState(false);
  const { product } = useSelector((state) => state.product);
  const ref = useRef();
  const isOverflow = useIsOverflow(ref);
  console.log(isOverflow);
  const DescriptionsContainer = styled(Box)(({ theme }) => ({
    height: show ? "auto" : "100vh",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.default,
    }),
  }));

  const ButtonDescriptions = styled(Button)(({ theme }) => ({
    width: "150px",
    // backgroundColor: alpha(theme.palette.primary.main, 0.5),
  }));
  return (
    <DescriptionsContainer ref={ref}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        children={product?.descriptions?.content}
      />
      <Box
        sx={{
          zIndex: 99,
          position: show ? "relative" : "absolute",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          pt: 4,
          py: 3,
          background: "linear-gradient(to top, white 50%,transparent)",
        }}
      >
        {isOverflow && (
          <ButtonDescriptions
            variant="outlined"
            color="primary"
            onClick={() => setShow(show ? false : true)}
          >
            {show ? "Hide" : "Show more"}
          </ButtonDescriptions>
        )}
      </Box>
    </DescriptionsContainer>
  );
}

export default ProductDescription;
