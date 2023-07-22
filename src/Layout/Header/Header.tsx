import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { isCompany, useAuth } from "../../components/Auth";
import Schedule from "./Schedule/Schedule";
import Modal from "@mui/material/Modal";
export default function Header() {
  const { role, user } = useAuth();
  if (!user) return null;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorNoti, setAnchorNoti] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const isNotifiOpen = Boolean(anchorNoti);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotiOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNoti(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotiClose = () => {
    setAnchorNoti(null);
  };

  const menuId = "primary-search-account-menu";
  const notifiId = "primary-notifi-menu";
  const scheduleId = "primary-schedu-menu";

  const { action } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    action.logout();
    navigate("/login");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

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
      sx={{ mt: "44px" }}
    >
      <MenuItem onClick={() => navigate("/profile")}>My profile</MenuItem>
      <MenuItem
        onClick={() => {
          !isCompany(role, user)
            ? navigate("/accepted")
            : navigate("/createJob");
        }}
      >
        {isCompany(role, user) ? "Create job" : "Accepted Jobs"}
      </MenuItem>
      {!isCompany(role, user) && (
        <MenuItem
          onClick={() => {
            navigate("/pendding");
          }}
        >
          {!isCompany(role, user) && "Pendding Jobs"}
        </MenuItem>
      )}
      {!isCompany(role, user) && (
        <MenuItem onClick={() => navigate("/rejected")}>
          {" "}
          Rejected Jobs
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderNotifi = (
    <Menu
      anchorEl={anchorNoti}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notifiId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotifiOpen}
      onClose={handleNotiClose}
      sx={{ mt: "44px" }}
    >
      <Typography
        variant="h5"
        fontWeight={"bold"}
        marginLeft={"15px"}
      >
        Notifications
      </Typography>
      <MenuItem onClick={() => navigate("/profile/candidate")}>
        Công ty Rikkei đã từ chối apply của bạn
      </MenuItem>
      <MenuItem onClick={() => navigate("/jobs")}>
        Công ty GDO đã từ chối apply của bạn
      </MenuItem>
      <MenuItem onClick={() => navigate("/")}>
        Công ty Sun* đã chấp nhận apply của bạn
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "pink", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#000",
              fontSize: "25px",
              fontWeight: "bold",
              "&:hover": {
                opacity: 0.8,
                cursor: "pointer",
              },
            }}
          >
            Top Dreams
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ mr: 2, color: "#000" }}
              aria-controls={scheduleId}
              // onClick={handleScheOpen}
            >
              <Badge
                badgeContent={1}
                color="error"
              >
                <CalendarMonthIcon onClick={showModal} />
                <Modal
                  open={isModalOpen}
                  onClose={handleClose}
                  sx={{ width: "80%", margin: "auto" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "64px",
                    }}
                  >
                    <Schedule />
                  </Box>
                </Modal>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 3 new notifications"
              sx={{ mr: 2, color: "#000" }}
              aria-controls={notifiId}
              onClick={handleNotiOpen}
            >
              <Badge
                badgeContent={3}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ mr: 2, color: "#000" }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotifi}
      {/* {show && <Schedule />} */}
    </Box>
  );
}
