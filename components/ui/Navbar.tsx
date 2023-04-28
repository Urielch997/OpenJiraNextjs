import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from 'src/context/ui';
import Link from 'next/link';

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
            <Link href={"/"} passHref>
              <Typography variant='h6' sx={{textDecoration:'none',color:'white'}}>OpenJira</Typography>
            </Link>
        </Toolbar>
    </AppBar>
  )
}
