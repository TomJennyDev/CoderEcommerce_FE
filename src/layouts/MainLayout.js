import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import CategoryBar from "../features/category/CategoryBar";
import useResponsive from "../hooks/useResponsive";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  const upMd = useResponsive("up", "md");

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Box sx={{ height: "80px" }}></Box>
      {upMd && <CategoryBar />}
      <AlertMsg />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
