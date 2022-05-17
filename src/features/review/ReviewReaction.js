import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { sendReviewReaction } from "./reviewSlice";

function ReviewReaction({ review }) {
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendReviewReaction({ reviewId: review._id, emoji }));
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleClick("like")}
        sx={{ color: "primary.main" }}
      >
        <ThumbUpRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2" mr={1}>
        {review?.reactions?.like}
      </Typography>

      <IconButton
        onClick={() => handleClick("dislike")}
        sx={{ color: "error.main" }}
      >
        <ThumbDownAltRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">{review?.reactions?.dislike}</Typography>
    </Stack>
  );
}

export default ReviewReaction;
