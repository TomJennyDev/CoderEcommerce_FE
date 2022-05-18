// material
import { Alert, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getAllProducts } from "./productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  let { products, filters } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [filters]);

  return (
    <Grid container spacing={3}>
      {products.length === 0 && (
        <Alert
          severity="info"
          sx={{
            width: "100%",
            textAlign: "center",
            m: 4,
            mt: 6,
            backgroundColor: "white",
          }}
        >{`No results found`}</Alert>
      )}
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
