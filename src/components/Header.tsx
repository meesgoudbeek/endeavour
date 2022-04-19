import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";

const Header = () => {
  return (
    <Link href="/">
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Rijksmuseum
          </Typography>
        </Toolbar>
      </AppBar>
    </Link>
  );
};

export default Header;
