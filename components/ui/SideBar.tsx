import { useContext } from 'react'
import { 
    Drawer, 
    Box, 
    Typography, 
    List, 
    ListItem, 
    ListItemIcon, 
    Divider,
    ListItemText
} from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'

import { UIContext } from '@/context/ui'

const menuItems: string[] = [ 'Inbox', 'Starred', 'Send Email', 'Draft' ]

export const SideBar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext( UIContext )

    return (
        <Drawer
            anchor='left'
            open={ sidemenuOpen }
            onClose={ closeSideMenu }
        >
            <Box
                sx={{ padding: '5px 10px' }}
            >
                <Typography variant='h4'>Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map( (text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={ text } />
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    menuItems.map( (text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={ text } />
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>
    )
}
