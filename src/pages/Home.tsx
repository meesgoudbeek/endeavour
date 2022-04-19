import { Box, Container, Typography } from "@mui/material";
import Gallery from "../components/Gallery";

const Home = () => {
  return (
    <>
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
          <Gallery />
        </Box>
      </main>
    </>
  );
};

export default Home;
