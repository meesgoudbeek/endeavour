import { useState } from "react";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
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
import Modal from "@mui/material/Modal";
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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const url = `https://www.rijksmuseum.nl/api/nl/collection?key=Jvg08nQv&ps=20&f.dating.period=19&toppieces=True`;

export default function Album() {
  const data: TApiResponse = useApiGet(url);
  const artwork = data.data;
  const [open, setOpen] = useState(false);
  const [currentArtPiece, setCurrentArtPiece] = useState({});
  const handleOpen = (artIndex) => {
    setCurrentArtPiece(artwork.artObjects[artIndex]);
    console.log(currentArtPiece);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // console.log(artwork);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
            Rijksmuseum Pronkstukken
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
                            <Button onClick={handleOpen} size="small">
                              Details
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Text in a modal
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                >
                                  Duis mollis, est non commodo luctus, nisi erat
                                  porttitor ligula.
                                </Typography>
                              </Box>
                            </Modal>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })
                : artwork.artObjects.map((art: any, index) => {
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
                            <Button
                              onClick={() => handleOpen(index)}
                              size="small"
                            >
                              Details
                            </Button>
                            {Object.keys(currentArtPiece).length && (
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    test
                                  </Typography>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                  >
                                    Duis mollis, est non commodo luctus, nisi
                                    erat porttitor ligula.
                                  </Typography>
                                </Box>
                              </Modal>
                            )}
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
