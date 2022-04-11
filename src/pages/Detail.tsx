import { useParams } from "react-router-dom";
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

const theme = createTheme();

export default function Detail() {
  const { id } = useParams();
  const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=Jvg08nQv`;
  const data: TApiResponse = useApiGet(url);
  const artwork = data.data;
  console.log(artwork);

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
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {artwork.artObject.title}
              </Typography>
              <Typography align="center" color="text.secondary" paragraph>
                {artwork.artObject.description}
              </Typography>
              <img src={artwork.artObject.webImage.url} alt="" />
            </Container>
          </Box>
        </main>
      )}
    </ThemeProvider>
  );
}
