import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { fNumber } from "../../../utils/numberFormat";

export default function TotalCustomers({ totalCustomers }) {
  const date = new Date();
  const curentMonth = date.getMonth() + 1;
  let customerCurrent = [];
  if (totalCustomers?.length == 1) {
    customerCurrent = totalCustomers;
  } else {
    customerCurrent = totalCustomers?.reduce((acc, curr, idx, arr) => {
      if (curr.month === curentMonth) acc.count = curr?.count;
      acc.percent = (arr[1].count * 100) / arr[0].count;
      return acc;
    }, {});
  }
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL CUSTOMERS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {customerCurrent?.length == 1
                ? customerCurrent?.[0].count
                : customerCurrent?.count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
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
          <ArrowUpwardIcon color="success" />

          <Typography
            color="success"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {fNumber(customerCurrent?.percent)} %
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
