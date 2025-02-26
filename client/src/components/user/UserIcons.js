import React, { useState } from 'react';
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';

const UserIcons = () => {
    const currentUser = null;

    const [anchorUserMenu, setAnchorUserMenu] = useState(null);

    return (
        <Box>
            <IconButton size='large' color='inherit'>
                <Badge color='error' badgeContent={5}>
                    <Mail />
                </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
                <Badge color='error' badgeContent={5}>
                    <Notifications />
                </Badge>
            </IconButton>
            <Tooltip title='Open User Settings'>
                <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                    <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                        {currentUser?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default UserIcons;
