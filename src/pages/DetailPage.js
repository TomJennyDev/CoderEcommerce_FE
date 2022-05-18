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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
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
  const params = useParams();
  const { id } = params;
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { isLoading: isLoadingCart } = useSelector((state) => state.cart);
  const [imgUrl, setImgUrl] = useState(0);

  let { product, error, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [params]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="none" color="inherit" component={RouterLink} to="/">
          Coder eCommerce
        </Link>
        <Typography color="text.primary">
          {product?.title?.length > 50
            ? product?.title?.slice(0, 50)
            : product?.title}
        </Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1, minHeight: "500px" }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {product ? (
                  <>
                    <Grid container spacing={2} sx={{ minHeight: "500px" }}>
                      <Grid item xs={12} md={4} sx={{ height: "500px" }}>
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          sx={{ height: "100%" }}
                        >
                          <ContainerImage>
                            <ProductImgStyle
                              alt={product?.title}
                              src={product?.imageUrls?.[imgUrl]}
                            />
                          </ContainerImage>
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
                                  {!isLoading && (
                                    <ProductImgChildStyle
                                      alt={product?.title}
                                      src={img}
                                    />
                                  )}
                                </ContainerChildImage>
                              );
                            })}
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Box sx={{ p: 2 }}>
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

                          <Typography variant="h5" paragraph>
                            {product?.title}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: 2 }}
                          >
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
                          </Stack>
                          <Typography variant="h4" sx={{ mb: 1 }}>
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
                          </Typography>

                          <Box direction="column">
                            <Box>
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
                            </Box>
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
                              loading={!!isLoadingCart}
                              disabled={
                                product?.inventoryStatus !== "available"
                              }
                              startIcon={<ShoppingCartIcon />}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Typography variant="h6">Product not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <ProductTabs productId={id} />
      <ProductSimilar categoryId={product.categoryId} />
    </Container>
  );
}

export default DetailPage;
