import {
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import ContentCut from '@mui/icons-material/ContentCut'
import MenuIcon from '@mui/icons-material/Menu'

export const Menu: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false)
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
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Drawer>
    </nav>
  )
}

export default Menu
