import { Container, Divider, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchHeader from "../../components/SearchHeader";
import { handleChangeFilters } from "../product/productSlice";
import CategoriesMenu from "./CategoryMenu";

const StackStyled = styled(Stack)(({ theme }) => ({
  boxShadow: "0px 4px 16px rgb(43 52 69 / 10%)",
  height: 70,
}));

const MenuItemstyled = styled(Link)(({ theme }) => ({
  cursor: "pointer",
}));

function CategoryBar(props) {
  const dispatch = useDispatch();

  const handleDispatch = (searchQuery) =>
    dispatch(handleChangeFilters({ title: searchQuery }));
  return (
    <StackStyled alignItems="center" direction="row">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CategoriesMenu />
          <SearchHeader handleDispatch={handleDispatch} />
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <MenuItemstyled component={NavLink} to="/">
              Home
            </MenuItemstyled>
            <MenuItemstyled component={NavLink} to="/category">
              Category
            </MenuItemstyled>
            <MenuItemstyled component={NavLink} to="/checkout">
              Checkout
            </MenuItemstyled>
          </Stack>
        </Stack>
      </Container>
    </StackStyled>
  );
}

export default CategoryBar;
