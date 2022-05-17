import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import CheckoutDelivery from "../components/CheckoutDelivery";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutSummary from "../components/CheckoutSummary";
import CartDetail from "../features/cart/CartDetail";
import { getCart } from "../features/cart/cartSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const { cart, products } = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const STEPS = [
    {
      value: "Cart",
      Cart: 0,
      component: (
        <CartDetail products={products} setActiveStep={setActiveStep} />
      ),
    },
    {
      value: "Delivery",
      Delivery: 1,
      component: <CheckoutDelivery setActiveStep={setActiveStep} />,
    },
    {
      value: "Payment",
      Payment: 2,
      component: <CheckoutPayment setActiveStep={setActiveStep} />,
    },
    {
      value: "Summary",
      Summary: 3,
      component: <CheckoutSummary setActiveStep={setActiveStep} />,
    },
  ];

  useEffect(() => {
    dispatch(getCart());
  }, [activeStep]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Coder eCommerce
        </Link>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Stack spacing={3}>
        <Box sx={{ width: { sx: "100%", md: "60%" }, mx: "auto" }}>
          <Stepper nonLinear activeStep={activeStep} sx={{ flexWrap: "wrap" }}>
            {STEPS.map((step, index) => (
              <Step key={step[step.value]}>
                <StepButton onClick={() => handleStep(step[step.value])}>
                  {step.value}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        {STEPS.map((step, idx) => {
          const isMatched = step[step.value] === activeStep;
          return (
            isMatched && <Box key={step[step.value]}>{step.component}</Box>
          );
        })}
      </Stack>
    </Container>
  );
}

export default CheckoutPage;
