import { Box, Typography, Link } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.rijksmuseum.nl/">
        Rijksmuseum
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Rijksmuseum pronkstukken
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Aan de slag met de meesterwerken
      </Typography>
      <Copyright />
    </Box>
  );
}

export default Footer;
