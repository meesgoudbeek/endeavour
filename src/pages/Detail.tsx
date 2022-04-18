import { useParams } from "react-router-dom";
import { useApiGet, TApiResponse } from "../services/useFetchHook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";

const Img = styled("img")({
  display: "block",
  width: "100%",
  maxHeight: "500px",
  objectFit: "cover",
  objectPosition: "0 20%",
});

export default function Detail() {
  const { id } = useParams();
  const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=Jvg08nQv`;
  const data: TApiResponse = useApiGet(url);
  const artwork = data.data;
  console.log(artwork);

  return (
    <>
      {artwork && (
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
                    alt={artwork.artObject.title}
                    src={artwork.artObject.webImage.url}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h4" component="div" gutterBottom>
                    {artwork.artObject.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {artwork.artObject.scLabelLine}
                  </Typography>
                </Grid>
                <Grid item>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {" "}
                        <Typography variant="body1">Beschrijving</Typography>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        {artwork.artObject.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="body1">
                        Technische informatie
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        {`Dit kunstwerk is gemaakt met ${artwork.artObject.physicalMedium}`}
                        .
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </main>
      )}
    </>
  );
}
