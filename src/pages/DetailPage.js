import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useLayoutEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { default as SkeletonLoading } from "../components/SkeletonLoading";
import { updateQuantityProductCart } from "../features/cart/cartSlice";
import ProductSimilar from "../features/product/ProductSimilar";
import { getProduct } from "../features/product/productSlice";
import ProductTabs from "../features/product/ProductTabs";
import useAuth from "../hooks/useAuth";
import { fCurrency } from "../utils/numberFormat";

const ProductImgStyle = styled("img")(({ theme }) => ({
  maxWidth: "65%",
  transition: theme.transitions.create(["transform", "hover"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
const ContainerImage = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "70%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));

const ContainerChildImage = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  padding: "5px",
  texAlign: "center",
  width: "80px",
  height: "80px",
  overflow: "hidden",
}));

const ProductImgChildStyle = styled("img")(({ theme }) => ({
  cursor: "pointer",
  display: "inline-block",
  transform: "scale(1)",
  textAlign: "center",
  width: "60%",
  height: "60%",

  transition: theme.transitions.create(["transform", "hover"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
function DetailPage() {
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState(0);

  let { product, error, isLoading } = useSelector(
    (state) => state.product,
    shallowEqual
  );

  useLayoutEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="none" color="inherit" component={RouterLink} to="/">
          Coder eCommerce
        </Link>
        <Typography color="text.primary">
          {product?.title?.length > 50
            ? product?.title?.slice(0, 50) + "..."
            : product?.title}
        </Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1, minHeight: "500px" }}>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Grid container spacing={2} sx={{ minHeight: "500px" }}>
              <Grid item xs={12} md={4} sx={{ height: "500px" }}>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  sx={{ height: "100%" }}
                >
                  <SkeletonLoading
                    isLoading={isLoading}
                    style={{ minHeight: "320px" }}
                    width="100%"
                  >
                    <ContainerImage>
                      <ProductImgStyle
                        alt={product?.title}
                        src={product?.imageUrls?.[imgUrl]}
                      />
                    </ContainerImage>
                  </SkeletonLoading>
                  <Stack
                    direction="row"
                    sx={{ maxheight: "30%", p: 2 }}
                    spacing={2}
                    justifyContent="center"
                  >
                    {product?.imageUrls?.slice(0, 3).map((img, idx) => {
                      return (
                        <ContainerChildImage
                          onClick={() => setImgUrl(idx)}
                          key={idx}
                        >
                          <SkeletonLoading
                            isLoading={isLoading}
                            width="80px"
                            height="80px"
                          >
                            {!isLoading ? (
                              <ProductImgChildStyle
                                alt={product?.title}
                                src={img}
                              />
                            ) : null}
                          </SkeletonLoading>
                        </ContainerChildImage>
                      );
                    })}
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ p: 2 }}>
                  <SkeletonLoading
                    isLoading={isLoading}
                    width="80px"
                    height="30px"
                  >
                    <Chip
                      avatar={<NewReleasesIcon />}
                      label={product?.status}
                      sx={{
                        mt: 2,
                        mb: 1,
                        background:
                          product?.status === "sale"
                            ? "linear-gradient(to right, #f12711, #f5af19)"
                            : "linear-gradient(to left, #009fff, #ec2f4b)",
                        textTransform: "uppercase",
                        "& .MuiChip-avatar": {
                          color: "white",
                        },
                      }}
                      color="info"
                      size="medium"
                    />
                  </SkeletonLoading>
                  <Typography variant="h5" paragraph>
                    <SkeletonLoading isLoading={isLoading}>
                      {product?.title}
                    </SkeletonLoading>
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                    <SkeletonLoading isLoading={isLoading}>
                      <Rating
                        value={product?.rateAverage}
                        precision={0.1}
                        readOnly
                      />

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ({product?.totalRatings} reviews)
                      </Typography>
                    </SkeletonLoading>
                  </Stack>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    <SkeletonLoading isLoading={isLoading}>
                      <Box
                        component="span"
                        sx={{
                          color: "text.disabled",
                          textDecoration: "line-through",
                        }}
                      >
                        {product?.price && fCurrency(product?.price)}
                      </Box>
                      &nbsp;{fCurrency(product?.priceSale)}
                    </SkeletonLoading>
                  </Typography>

                  <Box direction="column">
                    <Box>
                      <SkeletonLoading isLoading={isLoading}>
                        <Chip
                          //   avatar={<NewReleasesIcon />}
                          label={product?.inventoryStatus}
                          sx={{
                            mt: 2,
                            mb: 1,

                            textTransform: "uppercase",
                            "& .MuiChip-avatar": {
                              color: "white",
                            },
                          }}
                          color="info"
                          size="medium"
                          variant="outlined"
                        />
                      </SkeletonLoading>
                    </Box>
                    <SkeletonLoading isLoading={isLoading}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error(`Please login for add to Cart!`);
                          } else {
                            dispatch(
                              updateQuantityProductCart({
                                productId: id,
                                action: true,
                              })
                            );
                          }
                        }}
                        disabled={product?.inventoryStatus !== "available"}
                        startIcon={<ShoppingCartIcon />}
                      >
                        Add to Cart
                      </Button>
                    </SkeletonLoading>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <ProductTabs productId={id} />
      <ProductSimilar categoryId={product?.categoryId} />
    </Container>
  );
}

export default DetailPage;
