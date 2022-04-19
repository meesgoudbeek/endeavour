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
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Typography variant="body1">Beschrijving</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            {artworkDetail.artObject.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">Technische informatie</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            {`Dit kunstwerk is gemaakt met ${artworkDetail.artObject.physicalMedium}`}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default Information;
