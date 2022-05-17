import { Container, Divider, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import CategoriesMenu from "./CategoryMenu";

const StackStyled = styled(Stack)(({ theme }) => ({
  boxShadow: "0px 4px 16px rgb(43 52 69 / 10%)",
  height: 70,
}));

const MenuItemstyled = styled(Link)(({ theme }) => ({
  cursor: "pointer",
}));
function CategoryBar(props) {
  return (
    <StackStyled alignItems="center" direction="row">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CategoriesMenu />

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
