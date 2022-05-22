import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CategoryIcon from "@mui/icons-material/Category";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { fNumber } from "../../../utils/numberFormat";

export default function TotalProducts({ totalProducts }) {
  const date = new Date();
  const curentMonth = date.getMonth() + 1;
  let productCurrent = [];
  if (totalProducts?.length === 1) {
    productCurrent = totalProducts;
  } else {
    productCurrent = totalProducts?.reduce((acc, curr, idx, arr) => {
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
              TOTAL PRODUCT
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {productCurrent?.[0]?.count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <CategoryIcon />
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
            {fNumber(productCurrent?.percent)} %
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
