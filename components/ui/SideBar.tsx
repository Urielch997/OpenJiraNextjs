import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useContext } from "react";
import { UIContext } from "src/context/ui";

const MenuItems: string[] = [
    "Inbox", "Started", "Send email", "Drafts"
]

export const SideBar = () => {
    const {sidemenuOpen,CloseSideMenu} = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={sidemenuOpen}
            onClose={CloseSideMenu}
        >
            <Box sx={{ width: 250 }}>

                <Box sx={{ padding: '5px  10px' }}>
                    <Typography variant="h4">Menu</Typography>
                </Box>
                <List>
                    {
                        MenuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                    <Divider/>
                    <List>
                    {
                        MenuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
