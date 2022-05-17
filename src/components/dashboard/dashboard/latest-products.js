import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsDashboard } from "../../../features/dashboard/dashboardSlice";
import { fToNow } from "../../../utils/formatTime";

export default function LatestProducts(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const filter = { sortBy: "updatedAt.desc" };
    dispatch(getAllProductsDashboard(filter));
  }, []);
  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${products?.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products?.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product?._id}>
            <ListItemAvatar>
              <img
                alt={product?.title}
                src={product.imageUrls[0]}
                style={{
                  height: 48,
                  width: 48,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${fToNow(product?.updatedAt)}`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
