import { Box, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LatestOrders from "../../components/dashboard/dashboard/latest-orders";
import LatestProducts from "../../components/dashboard/dashboard/latest-products";
import Order from "../../components/dashboard/dashboard/Order";
import { Revenue } from "../../components/dashboard/dashboard/Revenue";
import TotalCustomers from "../../components/dashboard/dashboard/TotalCustomers";
import TotalOrder from "../../components/dashboard/dashboard/TotalOrder";
import TotalProducts from "../../components/dashboard/dashboard/TotalProducts";
import { TrafficByDevice } from "../../components/dashboard/dashboard/traffic-by-device";
import { getReportsDashboard } from "../../features/dashboard/dashboardSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getReportsDashboard());
  }, []);

  return (
    <Box>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Revenue revenues={reports.revenue} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCustomers totalCustomers={reports.totalCustomer} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalOrder totalOrders={reports.totalOrder} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProducts
              totalProducts={reports.totalProduct}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Order />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={8} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
