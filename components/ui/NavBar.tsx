import { useContext } from 'react'
import NextLink from 'next/link'
import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { UIContext } from '@/context/ui'

export const NavBar = () => {

  const { openSideMenu } = useContext( UIContext )

  return (
    <AppBar
        position='sticky'
        elevation={ 0 } >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={ openSideMenu } >
                    <MenuOutlinedIcon />
                </IconButton>

                <NextLink href='/' passHref legacyBehavior >
                  <Link underline='none' color='white' >
                    <Typography variant='h6'>Q - Tasks</Typography>
                  </Link>
                </NextLink>

            </Toolbar>
    </AppBar>
  )
}
