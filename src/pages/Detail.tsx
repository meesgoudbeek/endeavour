import { useParams } from "react-router-dom";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import Information from "../components/Information";

const Img = styled("img")({
  display: "block",
  width: "100%",
  maxHeight: "500px",
  objectFit: "cover",
  objectPosition: "0 20%",
});

const Detail = () => {
  const { id } = useParams();
  const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=Jvg08nQv`;
  const data: TApiResponse = useApiGet(url);
  const artworkDetail = data.data;

  return (
    <>
      {artworkDetail && (
        <main>
          <Box
            sx={{
              pt: 8,
              pb: 6,
            }}
          >
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Img
                    alt={artworkDetail.artObject.title}
                    src={artworkDetail.artObject.webImage.url}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h4" component="div" gutterBottom>
                    {artworkDetail.artObject.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {artworkDetail.artObject.scLabelLine}
                  </Typography>
                </Grid>
              </Grid>
              <Information artworkDetail={artworkDetail} />
            </Container>
          </Box>
        </main>
      )}
    </>
  );
};

export default Detail;
