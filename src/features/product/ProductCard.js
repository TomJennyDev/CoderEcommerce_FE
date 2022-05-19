import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Box,
  Card,
  IconButton,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Label from "../../components/Label";
import SkeletonLoading from "../../components/Skeleton";
import useAuth from "../../hooks/useAuth";
import { fCurrency } from "../../utils/numberFormat";
import { updateQuantityProductCart } from "../cart/cartSlice";
import { sendReviewReaction } from "./productSlice";
const ProductImgStyle = styled("img")(({ theme }) => ({
  width: "50%",
  height: "auto",
  transform: "translate(-50%,-50%) scale(1)",
  top: "50%",
  left: "50%",
  position: "absolute",
  transition: theme.transitions.create(["transform", "hover"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "translate(-50%,-50%) scale(1.05)",
  },
}));

const CardStyed = styled(Card)(({ theme }) => ({
  "&:hover": { boxShadow: 1 },
}));

export default function ProductCard({ product, isLoading }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    _id,
    title,
    imageUrls,
    price,
    status,
    priceSale,
    rateAverage,
    totalRatings,
    discount,
  } = product;

  const [valueRating, setRating] = useState(rateAverage);

  function getLabelText() {
    return `(${totalRatings})`;
  }
  return (
    <Card>
      <SkeletonLoading
        isLoading={isLoading}
        style={{ width: "100%", minHeight: "270px", padding: "10px" }}
      >
        <Box
          sx={{ pt: "100%", position: "relative", cursor: "pointer" }}
          onClick={() => navigate(`/detail/${_id}`)}
        >
          {status && (
            <Label
              variant="filled"
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: "absolute",
                textTransform: "uppercase",
                color: "white",
                boxShadow: 2,
                p: 1,
                background:
                  status === "sale"
                    ? "linear-gradient(to right, #f12711, #f5af19)"
                    : "linear-gradient(to left, #009fff, #ec2f4b)",
              }}
            >
              {status}
            </Label>
          )}

          {status === "sale" && (
            <Label
              variant="filled"
              sx={{
                zIndex: 9,
                top: 16,
                left: 16,
                position: "absolute",
                textTransform: "uppercase",
                color: "white",
                boxShadow: 3,

                fontSize: "1rem",
                background: "linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)",
              }}
            >
              {discount + "%"}
              <FaAngleDoubleDown />
            </Label>
          )}

          <ProductImgStyle alt={title} src={imageUrls[0]} />
        </Box>
      </SkeletonLoading>

      <Stack spacing={1} sx={{ p: 2 }}>
        {isLoading && (
          <SkeletonLoading isLoading={isLoading} count={3} width="100%" />
        )}
        {!isLoading && (
          <>
            <Link to={`/detail/${_id}`} color="inherit" component={RouterLink}>
              <Typography variant="subtitle2" noWrap>
                <SkeletonLoading isLoading={isLoading} height="100%">
                  {title}
                </SkeletonLoading>
              </Typography>
            </Link>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                name="read-only"
                value={valueRating}
                precision={1}
                onChange={(event, newValue) => {
                  if (!isAuthenticated) {
                    toast.error(`Please login for rating!`);
                  } else {
                    setRating(newValue);
                    dispatch(
                      sendReviewReaction({ productId: _id, rate: +newValue })
                    );
                  }
                }}
                getLabelText={getLabelText}
                size="small"
              />

              <Typography variant="subtitle2" noWrap color="text.disabled">
                ({totalRatings})
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {price && fCurrency(price)}
                </Typography>
                &nbsp;
                {fCurrency(priceSale)}
              </Typography>

              <IconButton
                aria-label="delete"
                size="medium"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error(`Please login for add to Cart!`);
                  } else {
                    dispatch(
                      updateQuantityProductCart({
                        productId: _id,
                        action: true,
                      })
                    );
                  }
                }}
              >
                <ShoppingCartCheckoutIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}
