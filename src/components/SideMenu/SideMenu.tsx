import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export default function SideMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    handleClose();
    await getAuth()
      .signOut()
      .catch((error) => {
        toast.error(error.message);
        return;
      });
    toast.success("See you next time!");
    navigate("/login");
    return;
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          <AccountCircleIcon /> Basic Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/skills");
            handleClose();
          }}
        >
          <AutoFixHighIcon />
          Skills
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <LogoutIcon /> Logout
        </MenuItem>
        <MenuItem>
          <span>Build 2.0 - Caesar</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
