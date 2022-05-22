import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REACT_APP_LIMIT } from "../../app/config";
import SwiperCustom from "../../components/swipper/SwiperCustom";
import { getAllProducts } from "./productSlice";

function ProductSimilar({ categoryId }) {
  let { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    let filters = { page, limit: Number(REACT_APP_LIMIT), categoryId };
    if (categoryId) {
      dispatch(getAllProducts(filters));
    }
  }, [dispatch, page, categoryId]);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ mb: 1 }} color="primary">
        PRODUCT SIMILAR
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <SwiperCustom products={products} />
    </Box>
  );
}

export default ProductSimilar;
