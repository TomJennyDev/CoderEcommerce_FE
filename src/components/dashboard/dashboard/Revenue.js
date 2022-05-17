import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { fCurrency, fNumber } from "../../../utils/numberFormat";

export function Revenue({ revenues }) {
  const date = new Date();
  const curentMonth = date.getMonth() + 1;
  const revenueCurrent = revenues?.reduce((acc, curr, idx, arr) => {
    if (curr.month === curentMonth) acc.total = curr?.total;
    if (curr.month === curentMonth - 1) acc.totalLastMonth = curr?.total;
    if (arr.length - 1 === idx) {
      acc.percent = (acc.total * 100) / acc.totalLastMonth;
    }
    return acc;
  }, {});

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              revenue
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {fCurrency(revenueCurrent?.total)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {revenueCurrent?.totallastMonth > revenueCurrent?.total ? (
            <ArrowDownwardIcon color="error" />
          ) : (
            <ArrowUpwardIcon color="success" />
          )}

          <Typography
            color={
              revenueCurrent?.totallastMonth > revenueCurrent?.total
                ? "error"
                : "success"
            }
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {fNumber(revenueCurrent?.percent)} %
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
