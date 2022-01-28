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
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../../contexts/Auth'
import { useNavigate } from 'react-router-dom'

enum Page {
  HOME = 'Home',
  USER = 'User',
}

export const Menu: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState<Page>(Page.HOME)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const redirect = (page: Page, url: string) => {
    setPage(page)
    navigate(url, { replace: true })
  }

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
            <MenuItem onClick={() => redirect(Page.HOME, '/')}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => redirect(Page.USER, '/user')}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>User</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                auth.signOut()
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>SignOut</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Drawer>
      {page}
    </nav>
  )
}

export default Menu
