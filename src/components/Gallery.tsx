import { useEffect, useState } from "react";
import { Container, Box, Input, Grid } from "@mui/material";
import Cards from "./Cards";
import axios from "axios";

const Gallery = () => {
  const url = `https://www.rijksmuseum.nl/api/nl/collection?key=Jvg08nQv&ps=18&f.dating.period=18&toppieces=True`;
  const [artwork, setArtwork] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        setArtwork(result.data.artObjects);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = artwork.filter((item: string) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(artwork);
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
            : artwork.map((art: any) => {
                return <Cards key={art.id} art={art} />;
              })}
        </Grid>
      )}
    </Container>
  );
};

export default Gallery;
