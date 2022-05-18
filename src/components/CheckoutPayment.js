import { yupResolver } from "@hookform/resolvers/yup";
import GradingIcon from "@mui/icons-material/Grading";
import PaymentsIcon from "@mui/icons-material/Payments";
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
import { updateCart } from "../features/cart/cartSlice";
import { TitleStyle } from "../theme/customizations/TitleStyle";
import CheckoutSumSideBar from "./CheckoutSumSideBar";
import { FormProvider, FRadioGroup, FTextField } from "./form";

const PaymentSchema = yup.object().shape({
  method: yup.string(),
  cardNumber: yup.number().required("cardNumber is required"),
  expMonth: yup.string().required("expMonth is required"),
  cardCVV: yup.string().required("cardCVV is required"),
  cardIssuer: yup.string().required("cardIssuer is required"),
});

export const methodPayment = ["CreditCards", "Cash", "BankOnline"];

function CheckoutPayment({ setActiveStep }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  console.log(cart.payment);
  const defaultValues = {
    method: cart?.payment?.method || "CreditCards",
    cardNumber: cart?.payment?.creditCards?.cardNumber || 0,
    expMonth: cart?.payment?.creditCards?.expMonth || "",
    cardCVV: cart?.payment?.creditCards?.cardCVV || "",
    cardIssuer: cart?.payment?.creditCards?.cardIssuer || "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(PaymentSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    const { method, ...restData } = data;
    console.log(data);
    const cartUpdate = {
      ...cart,
      payment: { method, creditCards: restData, total: cart.payment.total },
    };
    dispatch(updateCart(cartUpdate));
    setActiveStep((step) => step + 1);
  };

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box component={Paper} spacing={3} sx={{ width: 1, p: 2, pb: 4 }}>
              <Stack direction="row" alignItems="center" sx={{ pb: 2 }}>
                <TitleStyle>
                  <PaymentsIcon sx={{ width: "35px", height: "35px" }} />
                  <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
                    Payment
                  </Typography>
                </TitleStyle>
              </Stack>

              <Stack spacing={3}>
                <FRadioGroup name="method" options={methodPayment} />

                <Stack direction="row" spacing={3}>
                  <FTextField name="cardNumber" label="Card Number" />
                  <FTextField name="expMonth" label="Exp. Month" />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <FTextField name="cardCVV" label="CVV" />
                  <FTextField name="cardIssuer" label="Card Issuer" />
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckoutSumSideBar calSubTotal={cart?.payment?.total} />
            <Stack sx={{ py: 3 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<GradingIcon />}
              >
                Summary
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CheckoutPayment;
