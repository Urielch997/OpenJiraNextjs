import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from 'src/context/ui';

export const Navbar = () => {
  const {OpenSideMenu} = useContext(UIContext)

  return (
    <AppBar position='sticky' elevation={0}>
        <Toolbar>
            <IconButton size='large'
            edge='start'
            onClick={OpenSideMenu}
            >
                <MenuOutlinedIcon/>
            </IconButton>

            <Typography variant='h6'>OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}
