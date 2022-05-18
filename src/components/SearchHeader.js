import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

const CustomSearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
  },
  "&.MuiTextField-root": {
    width: "320px",
  },
  "&.MuiTextField-root:visited": {
    width: "400px",
  },
  mx: "auto",
}));

export default function SearchHeader({ handleDispatch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    handleDispatch(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <CustomSearchField
        // id="standard-basic"
        // variant="standard"
        value={searchQuery}
        placeholder="Search by name"
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
