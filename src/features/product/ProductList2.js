import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REACT_APP_LIMIT } from "../../app/config";
import PaginationBar from "../../components/PaginationBar";
import ProductCard from "./ProductCard";
import { getAllProducts } from "./productSlice";

function ProductList() {
  const dispatch = useDispatch();
  let { products, totalPage } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let pagination = { page, limit: Number(REACT_APP_LIMIT) };
    dispatch(getAllProducts(pagination));
  }, [dispatch, page]);
  return (
    <>
      <Grid container spacing={2} mt={1}>
        {products?.map((product) => (
          <Grid item key={product._id} xs={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <PaginationBar totalPage={+totalPage} setPage={setPage} page={+page} />
    </>
  );
}

export default ProductList;
