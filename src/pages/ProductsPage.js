// import BackupIcon from "@mui/icons-material/Backup";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
// import {
//   Alert,
//   Box,
//   Button,
//   Container,
//   Divider,
//   Paper,
//   Stack,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import tmdbApi, { category } from "../app/tmdbApi";
// import { FormProvider } from "../components/form";
// import LoadingScreen from "../components/loading/LoadingScreen";
// import MovieFilter from "../components/MovieFilter";
// import MovieList from "../components/MovieList";
// import useStoreContext from "../hooks/useStoreContext";

// const defaultValues = {
//   with_genres: [],
//   sort_by: "",
//   with_keywords: "",
// };

// function SearchPage() {
//   const { isOpenMenu, toggleMenu, with_keywords, setSearchKeyWords } =
//     useStoreContext();

//   const [search, setSearch] = useState(defaultValues);

//   const [movieList, setmovieList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pageCount, setPageCount] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const methods = useForm({ defaultValues });
//   const { handleSubmit, reset } = methods;

//   const onSubmit = (data) => {
//     setSearch({ ...search, ...data, with_keywords });
//     toggleMenu();
//   };

//   const resetFilter = () => {
//     reset();
//     setSearchKeyWords();
//     toggleMenu();
//   };

//   useEffect(() => {
//     isOpenMenu && toggleMenu();
//     return () => {
//       setSearchKeyWords();
//     };
//   }, []);

//   useEffect(() => {
//     const getmovies = async () => {
//       setLoading(true);
//       try {
//         const params = {
//           ...search,
//           with_keywords,
//           with_genres: search.with_genres.join(","),
//           page,
//         };

//         const response = await tmdbApi.discover(category.movie, params);

//         setmovieList(response.data.results);
//         setPageCount(response.data.total_pages);
//         setError("");
//       } catch (error) {
//         setError(error.message);
//       }
//       setLoading(false);
//     };
//     getmovies();
//   }, [page, search, with_keywords]);

//   const styledSideBar = {
//     position: { xs: "absolute", md: "static" },
//     width: { xs: "100vw", md: "auto" },
//     height: { xs: "calc(100vh - 130px)", md: 1 },
//     top: { xs: "130px", md: "none" },
//     left: { xs: 0, md: "none" },
//     zIndex: 999,
//     transform: { xs: !isOpenMenu ? "translateX(-100%)" : "none", md: "none" },
//   };

//   return (
//     <Container
//       maxWidth="xl"
//       sx={{
//         display: "flex",
//         height: "calc(100vh - 37px)",
//         pt: { xs: "120px", lg: "80px" },
//       }}
//     >
//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Stack component={Paper} elevation={5} sx={styledSideBar}>
//           <Stack
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "row",
//               height: "8%",
//               my: 1,
//             }}
//           >
//             <Button
//               sx={{ width: 0.8 }}
//               variant="outlined"
//               onClick={() => resetFilter()}
//               startIcon={<ClearAllIcon />}
//             >
//               Clear All
//             </Button>
//           </Stack>
//           <Divider />
//           <Stack
//             sx={{
//               p: 3,
//               flexGrow: 1,
//               width: { xs: 1, md: "250px" },
//               overflowY: "scroll",
//               "&::-webkit-scrollbar": {
//                 display: "none",
//               },
//             }}
//           >
//             <MovieFilter resetFilter={resetFilter} />
//           </Stack>
//           <Divider />

//           <Stack
//             justifyContent="center"
//             alignItems="center"
//             flexDirection="row"
//             sx={{ height: "8%", my: 1 }}
//           >
//             <Button
//               sx={{ width: 0.8 }}
//               variant="contained"
//               startIcon={<BackupIcon />}
//               type="submit"
//             >
//               Search
//             </Button>
//           </Stack>
//         </Stack>
//       </FormProvider>

//       <Stack sx={{ flexGrow: 1, mx: 1, width: 1 }}>
//         <Box
//           sx={{
//             height: 1,
//             overflowY: "scroll",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//           }}
//         >
//           {loading ? (
//             <LoadingScreen />
//           ) : (
//             <>
//               {error ? (
//                 <Alert severity="error">{error}</Alert>
//               ) : (
//                 <MovieList movies={movieList} />
//               )}
//             </>
//           )}
//         </Box>
//       </Stack>
//     </Container>
//   );
// }

// export default SearchPage;
