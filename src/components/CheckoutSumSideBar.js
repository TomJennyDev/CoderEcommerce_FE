import GradingIcon from "@mui/icons-material/Grading";
import PaymentIcon from "@mui/icons-material/Payment";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { fCurrency } from "../utils/numberFormat";

function CheckoutSumSideBar({ calSubTotal, register, step }) {
  return (
    <Box component={Paper} spacing={3} sx={{ width: 1, p: 2 }}>
      <Stack direction="row" justifyContent="space-Between" spacing={2}>
        <Typography variant="subtitle1" textAlign="center">
          SubTotal:
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          {fCurrency(calSubTotal?.subTotal)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-Between" spacing={2}>
        <Typography variant="subtitle1" textAlign="center">
          Shipping:
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          {fCurrency(calSubTotal?.shipping)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-Between" spacing={2}>
        <Typography variant="subtitle1" textAlign="center">
          Tax (VAT):
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          10%
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-Between" spacing={2}>
        <Typography variant="subtitle1" textAlign="center">
          Discount:
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          __
        </Typography>
      </Stack>
      <Divider sx={{ m: 1 }} />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Typography variant="h6" textAlign="center">
          {fCurrency(calSubTotal?.total)}
        </Typography>
      </Stack>
      <Stack sx={{ py: 3 }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={step === "Payment" ? <PaymentIcon /> : <GradingIcon />}
        >
          {step}
        </Button>
      </Stack>
    </Box>
  );
}

export default CheckoutSumSideBar;
