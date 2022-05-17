import { yupResolver } from "@hookform/resolvers/yup";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { capitalCase } from "change-case";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { FormProvider } from "../../components/form";
import { getAllCategories } from "../../features/category/categorySlice";
import { getProductDashboard } from "../../features/dashboard/dashboardSlice";
import ProductForm from "../../features/dashboard/Product/ProductForm";
import ProductUpLoadImg from "../../features/dashboard/Product/ProductUploadImg";
import useResponsive from "../../hooks/useResponsive";
import { TitleStyle } from "../../theme/customizations/TitleStyle";

const schema = yup.object({
  sku: yup.string().required(),
  title: yup.string().required(),
  status: yup.string().required(),
  price: yup.number().required(),
  discount: yup.number().required(),
  quantity: yup.number().required(),
  descriptions: yup.string().required(),
  categoryId: yup.string().required(),
  isDeleted: yup.boolean(),
});

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: theme.spacing(2),
}));

function EditProductPage() {
  const dispatch = useDispatch();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
  const { id } = useParams();
  const { product } = useSelector((state) => state.dashboard);
  const { categories } = useSelector((state) => state.category);

  const defaultValues = {
    sku: product?.sku || "",
    title: product?.title || "",
    status: product?.status || "new",
    price: product?.price || 0,
    discount: product?.discount || 0,
    quantity: product?.quantity || 0,
    descriptions: product?.descriptions?.content || "",
    categoryId: product?.categoryId || "",
    isDeleted: product?.isDeleted || true,
  };
  console.log(defaultValues);

  const methods = useForm({
    defaultValues,

    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const editorContent = watch("descriptions");

  const onEditorStateChange = (editorState) => {
    console.log(editorState);
    setValue("descriptions", editorState);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const [currentTab, setCurrentTab] = useState("Product");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "Product",
      icon: <AddBoxIcon sx={{ fontSize: 24 }} />,
    },
    {
      value: "Images",
      icon: <CameraAltIcon sx={{ fontSize: 24 }} />,
    },
  ];

  useEffect(() => {
    if (id) dispatch(getProductDashboard(id));
    dispatch(getAllCategories());
  }, [dispatch, id]);

  useEffect(() => {
    register("descriptions", { required: true });
  }, [register]);

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2 }}
        >
          <TitleStyle>
            <CategoryIcon sx={{ width: "35px", height: "35px" }} />
            <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
              Product
            </Typography>
          </TitleStyle>

          <Box>
            <Button type="submit" variant="outlined" color="primary">
              Save
            </Button>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            width: 1,
            minHeight: "100vh",
            backgroundColor: "white",
          }}
        >
          <Stack flexGrow="1">
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                allowScrollButtonsMobile
                onChange={(e, value) => handleChangeTab(value)}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab
                    key={tab.value}
                    value={tab.value}
                    icon={tab.icon}
                    iconPosition="end"
                    label={capitalCase(tab.value)}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ px: 0.5, py: 2 }}>
              {currentTab === "Product" && (
                <ProductForm
                  categories={categories}
                  product={product}
                  setCurrentTab={setCurrentTab}
                  editorContent={editorContent}
                  onEditorStateChange={onEditorStateChange}
                  errors={errors}
                />
              )}
              {currentTab === "Images" && (
                <ProductUpLoadImg setCurrentTab={setCurrentTab} />
              )}
            </Box>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default EditProductPage;
