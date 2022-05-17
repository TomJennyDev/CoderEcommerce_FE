import SendIcon from "@mui/icons-material/Send";
import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { createReview } from "./reviewSlice";

function ReviewForm({ productId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState("");
  const dispatch = useDispatch();
  console.log("ấdasdasd");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ productId, comments }));
    setComments("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user?.avatarUrl} alt={user?.name} />
        <TextField
          fullWidth
          size="small"
          value={comments}
          placeholder="Write a review..."
          onChange={(event) => setComments(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default ReviewForm;
