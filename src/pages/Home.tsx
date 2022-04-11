import { useState } from "react";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.rijksmuseum.nl/">
        Rijksmuseum
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const url = `https://www.rijksmuseum.nl/api/nl/collection?key=Jvg08nQv&ps=20&f.dating.period=19&toppieces=True`;

export default function Album() {
  const data: TApiResponse = useApiGet(url);
  const artwork = data.data;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  console.log(artwork);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = artwork.artObjects.filter((item) => {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Rijksmuseum
          </Typography>
        </Toolbar>
      </AppBar>
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
              <Input
                placeholder="Zoeken..."
                onChange={(e) => searchItems(e.target.value)}
              />
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
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
                              variant="h5"
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
                : artwork.artObjects.map((art: any, index) => {
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
                            <RouterLink to={`/detail/${art.id}`}>
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
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
