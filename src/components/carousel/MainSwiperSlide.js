import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Chip,
  Divider,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import apiConfig from "../../app/config";
import "./carousel.css";

export default function MainSwiperSlide({ movie, isActive }) {
  const containerRef = useRef(null);
  const location = useLocation();

  const { poster_path, title, overview, release_date, vote_average } = movie;
  const styledContainerSwiperSlide = {
    position: "relative",
    width: 1,
    height: 1,
  };

  const styledImg = () => ({
    backgroundImage: `url(${apiConfig.originalImage(poster_path)})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: " top center",
    width: 1,
    height: 1,
    position: "absolute",
    "&::after": {
      zIndex: 99,
      position: "absolute",
      top: 0,
      left: 0,
      content: "''",
      width: 1,
      height: 1,
      background:
        "linear-gradient(to right, rgba(0,0,0) 30%,rgba(0,0,0,0.8),rgba(0,0,0,0.6),transparent,rgba(0,0,0,0.8))",
    },
  });

  const styledTitleContainer = {
    "&&&": { filter: "none" },
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    zIndex: 999,
    flexDirection: "row",
    "& img": {
      width: "260px",
      height: "360px",
    },
  };

  const styledTitle = {
    fontWeight: "bold",
    fontSize: "3em",
    textAlign: "left",
  };

  const styledButtonCarousel = (theme) => ({
    px: 2,
    py: 1,
    border: "none",
    borderRadius: 5,
    color: theme.palette.common.white,
    fontSize: "1.1rem",
    position: "relative",
    letterSpacing: "5px",
    "&::after": {
      content: "''",
      position: "absolute",
      zIndex: "-1",
      top: 0,
      left: 0,
      width: "50px",
      height: 1,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%",
      boxShadow: `0 0 20px ${theme.palette.primary.main}`,

      transition: theme.transitions.create(["all"], {
        duration: theme.transitions.duration.standard,
      }),
    },
    "&:hover::after": {
      width: 1,
      borderRadius: 2,
      left: 0,
    },
    "&:hover": {
      border: "none",
    },
    "&&& svg": {
      fontSize: "1.8rem",
      mr: 1,
    },
  });

  return (
    <Box sx={styledContainerSwiperSlide}>
      <Box sx={styledImg} />
      <Stack sx={styledTitleContainer}>
        <Stack
          sx={{
            width: { xs: 1, md: 0.4 },
            height: 0.8,
            alignItems: "flex-start",
            justifyContent: "center",
            px: { xs: 2, md: 10 },
            overflowY: "hidden",
          }}
          spacing={2}
          ref={containerRef}
        >
          <Slide
            direction="up"
            in={isActive}
            style={{ transitionDelay: isActive ? "200ms" : "0" }}
            timeout={300}
            container={containerRef.current}
          >
            <Typography sx={styledTitle}>{title}</Typography>
          </Slide>
          <Slide
            direction="up"
            in={isActive}
            style={{ transitionDelay: isActive ? "500ms" : "0" }}
            timeout={300}
            container={containerRef.current}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              divider={
                <Divider
                  orientation="vertical"
                  sx={{ borderColor: "primary.dark" }}
                />
              }
            >
              <Chip
                color="primary"
                variant="outlined"
                icon={<CalendarTodayIcon />}
                label={release_date}
              />
              <Chip
                color="primary"
                variant="contained"
                icon={<StarIcon />}
                label={vote_average}
              />
            </Stack>
          </Slide>
          <Slide
            direction="up"
            in={isActive}
            style={{ transitionDelay: isActive ? "800ms" : "0" }}
            timeout={300}
            container={containerRef.current}
          >
            <Typography sx={{ textAlign: "left" }}>{overview}</Typography>
          </Slide>
          <Slide
            direction="up"
            in={isActive}
            style={{ transitionDelay: isActive ? "1100ms" : "0" }}
            timeout={300}
            container={containerRef.current}
          >
            <Button
              variant="outlined"
              sx={styledButtonCarousel}
              startIcon={<PlayArrowIcon />}
              component={Link}
              to={`/modal/${movie.id}`}
              state={{ backgroundLocation: location }}
            >
              Watch Trailer
            </Button>
          </Slide>
        </Stack>
      </Stack>
    </Box>
  );
}
