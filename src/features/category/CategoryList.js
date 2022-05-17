import { Grid, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

function CategoryList() {
  const { subCategories } = useSelector((state) => state.category);
  return (
    <Grid container>
      {subCategories?.map((subCateL2) => {
        return (
          <Grid item xs={4} md={4} key={subCateL2._id}>
            <Link
              component={RouterLink}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                display: "block",
                pb: 2,

                fontSize: "1.3rem",
                color: "text.primary",
              }}
              to={`/category/${subCateL2._id}`}
            >
              {subCateL2?.title}
            </Link>
            <SubCategoryChildL2 subCatesL3={subCateL2.children} />
          </Grid>
        );
      })}
    </Grid>
  );
}

function SubCategoryChildL2({ subCatesL3 }) {
  return (
    <>
      {subCatesL3?.map((subCateL3) => {
        return (
          <Link
            component={RouterLink}
            sx={{
              display: "block",
              cursor: "pointer",
              textAlign: "center",
              p: 1,
              color: "text.primary",
            }}
            key={subCateL3._id}
            to={`/category/${subCateL3._id}`}
          >
            {subCateL3.title}
          </Link>
        );
      })}
    </>
  );
}

export default CategoryList;
