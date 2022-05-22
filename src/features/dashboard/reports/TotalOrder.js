import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { fNumber } from "../../../utils/numberFormat";

export default function TotalOrder({ totalOrders }) {
  const date = new Date();
  const curentMonth = date.getMonth() + 1;

  const orderCurrent = totalOrders?.reduce((acc, curr, idx, arr) => {
    if (curr.month === curentMonth) acc.count = curr?.count;
    if (curr.month === curentMonth - 1) acc.countLastMonth = curr?.count;
    if (arr.length - 1 === idx) {
      acc.percent = (acc.count * 100) / acc.countLastMonth;
    }
    return acc;
  }, {});

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL ODERS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {orderCurrent?.count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
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
          {orderCurrent?.countLastMonth > orderCurrent?.count ? (
            <ArrowDownwardIcon color="error" />
          ) : (
            <ArrowUpwardIcon color="success" />
          )}

          <Typography
            color={
              orderCurrent?.countLastMonth > orderCurrent?.count
                ? "error"
                : "success"
            }
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {fNumber(orderCurrent?.percent)} %
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
