import { yupResolver } from "@hookform/resolvers/yup";
import ClearAllIcon from "@mui/icons-material/ClearAll";
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { FormProvider, FRadioGroup, FTextField } from "../../components/form";
import { TitleStyle } from "../../theme/customizations/TitleStyle";
import CartSideBar from "./CartSideBar";
import { updateCart } from "./cartSlice";

const PaymentSchema = yup.object().shape({
  method: yup.string(),
  cardNumber: yup.number().required("cardNumber is required"),
  expMonth: yup.string().required("expMonth is required"),
  cardCVV: yup.string().required("cardCVV is required"),
  cardIssuer: yup.string().required("cardIssuer is required"),
});

const PaymentCreaditSchema = yup.object().shape({
  method: yup.string(),
});

export const methodPayment = ["credit", "cash", "bankOnline"];

export const labelMethodPayment = {
  credit: "Credit Cards",
  cash: "Cash",
  bankOnline: "Bank Online",
};

const defaultData = {
  method: "credit",
  cardNumber: 0,
  expMonth: "",
  cardCVV: "",
  cardIssuer: "",
};
function CartPayment({ setActiveStep }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [method, setMethod] = useState(cart.payment?.method);

  let creditCards = cart.payment?.creditCards;

  const payment = { method, ...creditCards };

  const defaultValues = payment.method ? payment : defaultData;

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      method === "credit" ? PaymentSchema : PaymentCreaditSchema
    ),
    mode: "onChange",
  });
  const { handleSubmit, reset, watch } = methods;
  const methodValues = watch("method");

  const onSubmit = async (data) => {
    const { method, ...restData } = data;
    const creditCards = restData;

    let payment = { method, total: cart.payment.total };
    payment = creditCards.cardNumber ? { ...payment, creditCards } : payment;
    const cartUpdate = {
      ...cart,
      payment,
    };
    await dispatch(updateCart(cartUpdate));

    setActiveStep((step) => step + 1);
  };

  useEffect(() => {
    setMethod(methodValues);
  }, [methodValues]);

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
                <FRadioGroup
                  name="method"
                  options={methodPayment}
                  getOptionLabel={labelMethodPayment}
                />
                {methodValues === "credit" && (
                  <>
                    <Stack direction="row" spacing={3}>
                      <FTextField name="cardNumber" label="Card Number" />
                      <FTextField name="expMonth" label="Exp. Month" />
                    </Stack>
                    <Stack direction="row" spacing={3}>
                      <FTextField name="cardCVV" label="CVV" />
                      <FTextField name="cardIssuer" label="Card Issuer" />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={3}
                      sx={{ p: 1 }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          reset(defaultData);
                        }}
                        startIcon={<ClearAllIcon />}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </>
                )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <CartSideBar calSubTotal={cart?.payment?.total} />
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

export default CartPayment;
