import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogOutBtn from "@mui/icons-material/ExitToAppOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../redux/slices/authSlice";
import quoraLogo from "../../assets/quoraLogo.png";
import arrowDown from "../../assets/arrowDown.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logout());

          handleMenuClose();
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logout());
          handleProfileMenuOpen();
        }}
      >
        <IconButton
          size="large"
          aria-label="log out user"
          aria-controls="primary-search-log-out-button"
          aria-haspopup="true"
          color="inherit"
        >
          <LogOutBtn />
        </IconButton>
        <p>Log out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        marginBottom: "5px",
        minWidth: "320px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "10",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "#BA3431",
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              "&:hover": { cursor: "pointer" },
              marginLeft: "124px",
              marginTop: "7px",
              marginRight: "138px",
            }}
          >
            <img src={quoraLogo} alt="logo" />
          </Typography>

          <SearchIcon
            sx={{
              color: "#939598",
              width: "20px",
              height: "20px",
              position: "relative",
              left: "30px",
            }}
          />

          <input
            type="text"
            style={{
              border: "none",
              paddingLeft: "40px",
              outline: "none",

              boxSizing: "border-box",
              width: "320px",
              height: "34px",
              background: "#FFFFFF",
              borderRadius: "3px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            placeholder="Search anything..."
          />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <button
              onClick={handleProfileMenuOpen}
              aria-controls={menuId}
              aria-label="account of current user"
              aria-haspopup="true"
              style={{
                boxSizing: "border-box",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "7px 16px",
                gap: "8px",
                width: "127px",
                height: "34px",
                borderRadius: "4px",
                marginRight: "80px",
                color: "#BA3431",
                fontFamily: "Lato",
              }}
            >
              {userInfo.username}
              <img src={arrowDown} alt="user profile menu" />
            </button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
