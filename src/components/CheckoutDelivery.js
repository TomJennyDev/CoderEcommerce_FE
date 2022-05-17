import { yupResolver } from "@hookform/resolvers/yup";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { FormProvider, FRadioGroup, FTextField } from "../components/form";
import { updateCart } from "../features/cart/cartSlice";
import { TitleStyle } from "../theme/customizations/TitleStyle";
import CheckoutSumSideBar from "./CheckoutSumSideBar";

const DeliverySchema = yup.object().shape({
  email: yup.string().required("email is required"),
  phone: yup.number().required("phone is required"),
  city: yup.string().required("City is required"),
  district: yup.string().required("district is required"),
  ward: yup.string().required("ward is required"),
  address1: yup.string().required("Address is required"),
  address2: yup.string(),
});

let shippingMethodLabel = [
  "Free (expect to recive in 5-7 days)",
  "Express (expect to receive in 3-5 days)",
  "Next Day",
];
let shippingMethod = [7, 5, 1];

function CheckoutDelivery({ setActiveStep }) {
  const dispatch = useDispatch();
  const { products, cart } = useSelector((state) => state.cart);
  const { shipping } = cart;

  let defaultValues = {
    email: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address1: "",
    address2: "",
    method: "1",
  };

  defaultValues = shipping || defaultValues;
  const calSubTotal = products.reduce(
    (acc, curr, index, arr) => {
      acc.subTotal = acc.subTotal + curr.productId.priceSale * curr.quantity;
      acc.shipping = acc.shipping + curr.productId.shipping * curr.quantity;
      if (index === arr.length - 1) {
        acc.subTotal = acc.subTotal / arr.length;
        acc.shipping = acc.shipping / arr.length;
        acc.total = acc.subTotal + (acc.subTotal * 10) / 100 + acc.shipping;
      }
      return acc;
    },
    { subTotal: 0, shipping: 0, total: 0 }
  );

  let methods = useForm({
    defaultValues,
    shouldUnregister: false,
    resolver: yupResolver(DeliverySchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const cart = {
      payment: {
        total: { ...calSubTotal, tax: 10 },
      },
      shipping: data,
      status: "Delivery",
    };

    await dispatch(updateCart(cart));
    setActiveStep((step) => step + 1);
  };

  useEffect(() => {
    return;
  }, []);
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box component={Paper} spacing={3} sx={{ width: 1, pb: 2, p: 1 }}>
              <Stack direction="row" alignItems="center" sx={{ pb: 2 }}>
                <TitleStyle>
                  <LocalShippingIcon sx={{ width: "35px", height: "35px" }} />
                  <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
                    Delivery
                  </Typography>
                </TitleStyle>
              </Stack>
              <Typography variant="h6" textAlign="left" sx={{ p: 1 }}>
                Address
              </Typography>
              <Stack direction="row" spacing={3} sx={{ p: 2 }}>
                <FTextField name="email" label="Email" />
                <FTextField name="phone" label="Phone" />
              </Stack>
              <Stack direction="row" spacing={3} sx={{ p: 2 }}>
                <FTextField name="city" label="City" />
                <FTextField name="district" label="District" />
                <FTextField name="ward" label="Ward" />
              </Stack>
              <Stack direction="row" spacing={3} sx={{ p: 2 }}>
                <FTextField name="address1" label="Address1" />
                <FTextField name="address2" label="Address2" />
              </Stack>
              <Stack direction="column" spacing={3} sx={{ p: 2 }}>
                <Typography variant="h6" textAlign="left">
                  Shipping Method
                </Typography>
                <FRadioGroup
                  name="method"
                  options={shippingMethod}
                  getOptionLabel={shippingMethodLabel}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckoutSumSideBar calSubTotal={calSubTotal} step={"Payment"} />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CheckoutDelivery;
