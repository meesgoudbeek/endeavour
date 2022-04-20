import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
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
          sx={{ objectPosition: "0 15%" }}
          component="img"
          height="200"
          image={artPiece.webImage.url}
          alt="random"
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
            style={{ textDecoration: "none" }}
          >
            <Button size="small">Details</Button>
          </RouterLink>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Cards;
