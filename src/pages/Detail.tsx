import { useParams } from "react-router-dom";
import { Container, Grid, styled, Typography } from "@mui/material";
import Information from "../components/Information";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [artworkDetail, setArtwork] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        setArtwork(result.data.artObject);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  return (
    <>
      {artworkDetail && (
        <main>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Img
                  alt={artworkDetail.title}
                  src={artworkDetail.webImage.url}
                />
              </Grid>
              <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {artworkDetail.title}
                </Typography>
                <Typography variant="subtitle1">
                  {artworkDetail.scLabelLine}
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
