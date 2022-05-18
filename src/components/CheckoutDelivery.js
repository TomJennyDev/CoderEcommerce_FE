import { yupResolver } from "@hookform/resolvers/yup";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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

  let methods = useForm({
    defaultValues,
    shouldUnregister: false,
    resolver: yupResolver(DeliverySchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    const cartUpdate = {
      ...cart,
      shipping: data,
      status: "Delivery",
    };

    dispatch(updateCart(cartUpdate));
    setActiveStep((step) => step + 1);
  };

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
            <CheckoutSumSideBar calSubTotal={cart?.payment?.total} />
            <Stack sx={{ py: 3 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<PaymentIcon />}
              >
                Payment
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CheckoutDelivery;
