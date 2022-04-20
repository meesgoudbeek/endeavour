import { useParams } from "react-router-dom";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import Information from "../components/Information";

const Img = styled("img")({
  display: "block",
  width: "100%",
  maxHeight: "600px",
  objectFit: "cover",
  objectPosition: "0 10%",
});

const Detail = () => {
  const { id } = useParams();
  const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=Jvg08nQv`;
  const data: TApiResponse = useApiGet(url);
  const artworkDetail = data.data;
  console.log(artworkDetail);

  return (
    <>
      {artworkDetail && (
        <main>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Img
                  alt={artworkDetail.artObject.title}
                  src={artworkDetail.artObject.webImage.url}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {artworkDetail.artObject.title}
                </Typography>
                <Typography variant="subtitle1">
                  {artworkDetail.artObject.scLabelLine}
                </Typography>
              </Grid>
              <Information artworkDetail={artworkDetail} />
            </Grid>
          </Container>
        </main>
      )}
    </>
  );
};

export default Detail;
