import { useEffect, useState } from "react";
import { Container, Box, Input, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
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

  const [search, setNewSearch] = useState("");

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = !search
    ? artwork
    : artwork.filter((art: string) => {
        return Object.values(art)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box
        sx={{
          pb: 4,
          textAlign: "center",
        }}
      >
        <Input
          placeholder="Zoeken..."
          value={search}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
      {artwork && (
        <Grid container spacing={4}>
          {filtered.map((art: any) => {
            return <Cards key={art.id} art={art} />;
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Gallery;
