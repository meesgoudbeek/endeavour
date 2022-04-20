import { useState } from "react";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
import { Container, Box, Input, Grid } from "@mui/material";
import Cards from "./Cards";

const Gallery = () => {
  const url = `https://www.rijksmuseum.nl/api/nl/collection?key=Jvg08nQv&ps=18&f.dating.period=18&toppieces=True`;
  const data: TApiResponse = useApiGet(url);
  const artwork = data.data;

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = artwork.artObjects.filter((item: string) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(artwork.artObjects);
    }
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box
        sx={{
          pb: 4,
        }}
      >
        <Input
          placeholder="Zoeken..."
          onChange={(e) => searchItems(e.target.value)}
        />
      </Box>
      {artwork && (
        <Grid container spacing={4}>
          {searchInput.length > 1
            ? filteredResults.map((art: any) => {
                return <Cards key={art.id} art={art} />;
              })
            : artwork.artObjects.map((art: any) => {
                return <Cards key={art.id} art={art} />;
              })}
        </Grid>
      )}
    </Container>
  );
};

export default Gallery;
