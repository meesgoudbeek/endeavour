import { useState } from "react";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Input,
  Typography,
} from "@mui/material";

const url = `https://www.rijksmuseum.nl/api/nl/collection?key=Jvg08nQv&ps=20&f.dating.period=18&toppieces=True`;

const Home = () => {
  const data: TApiResponse = useApiGet(url);
  const artwork = data.data;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  console.log(artwork);

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
    <>
      {artwork && (
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Rijksmuseum pronkstukken
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Aan de slag met de meesterwerken
              </Typography>
            </Container>
          </Box>
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
            <Grid container spacing={4}>
              {searchInput.length > 1
                ? filteredResults.map((art: any) => {
                    return (
                      <Grid key={art.id} item xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            sx={{ objectPosition: "0 15%" }}
                            component="img"
                            height="200"
                            image={art.webImage.url}
                            alt="random"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              {art.title}
                            </Typography>
                            <Typography>{art.principalOrFirstMaker}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">Details</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })
                : artwork.artObjects.map((art: any, index: number) => {
                    return (
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            sx={{ objectPosition: "0 20%" }}
                            component="img"
                            height="200"
                            image={art.webImage.url}
                            alt="random"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              {art.title}
                            </Typography>
                            <Typography>{art.principalOrFirstMaker}</Typography>
                          </CardContent>
                          <CardActions>
                            <RouterLink to={`/detail/${art.objectNumber}`}>
                              Details
                            </RouterLink>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
            </Grid>
          </Container>
        </main>
      )}
    </>
  );
};

export default Home;
