import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

const Cards = (art: any) => {
  const artPiece = art.art;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ objectPosition: "0 20%" }}
          component="img"
          height="300"
          image={artPiece.webImage.url}
          alt={artPiece.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {artPiece.title}
          </Typography>
          <Typography>{artPiece.principalOrFirstMaker}</Typography>
        </CardContent>
        <CardActions>
          <RouterLink
            to={`/detail/${artPiece.objectNumber}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Details
          </RouterLink>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Cards;
