import { Card, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import SkeletonLoading from "../../components/Skeleton";
const ProductImgStyle = styled("img")(({ theme }) => ({
  width: "50%",
  height: "auto",
  transform: "translate(-50%,-50%) scale(1)",
  top: "50%",
  left: "50%",
  position: "absolute",
  transition: theme.transitions.create(["transform", "hover"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "translate(-50%,-50%) scale(1.05)",
  },
}));

const CardStyed = styled(Card)(({ theme }) => ({
  "&:hover": { boxShadow: 1 },
}));

export default function ProductCardSkeleton({ isLoading }) {
  return (
    <Card>
      <SkeletonLoading
        isLoading={true}
        style={{ width: "100%", minHeight: "270px" }}
      />

      <Stack spacing={1} sx={{ p: 2 }}>
        <SkeletonLoading isLoading={true} count={3} width="100%" />
      </Stack>
    </Card>
  );
}
