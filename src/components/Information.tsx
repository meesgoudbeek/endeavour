import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Information = ({ artworkDetail }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1">Beschrijving</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{artworkDetail.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1">
              Informatie bij het kunstwerk
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {artworkDetail.plaqueDescriptionDutch ? (
              <Typography variant="body1">
                {`${artworkDetail.plaqueDescriptionDutch}`}
              </Typography>
            ) : (
              <Typography variant="subtitle1">{`Geen informatie`}</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default Information;
