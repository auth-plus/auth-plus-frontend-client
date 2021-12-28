import {
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu'
import { AuthContext } from '../../../contexts/Auth';

export const Menu: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false)
  const auth = useContext(AuthContext)
  return (
    <nav>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen((prev) => !prev)}
      >
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem onClick={()=>{
              auth.signOut()
            }} >
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>SignOut</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Drawer>
    </nav>
  )
}

export default Menu
