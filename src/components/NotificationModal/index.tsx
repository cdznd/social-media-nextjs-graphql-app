'use client'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { borderRadius } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '1rem',
    pt: 2,
    px: 4,
    pb: 3,
};

interface NotificationModalProps {
    open: boolean;
    onClose: () => void;
}

export default function NotificationModal(
    { open, onClose }: NotificationModalProps) {

    const notifications = [
        {
            id: 1,
            title: 'New follower',
            description: 'John Doe started following you',
            timestamp: new Date().toISOString()
        },
    ];

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="notifications-modal"
        >
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Notifications
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ border: '1px solid gray', p: '1rem', borderRadius: '1rem', background: 'gray' }}>
                    <Typography variant="h6" component="h6">
                        Friend Requests
                    </Typography>
                    <List sx={{ p: 0 }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{
                                        border: '1px solid black',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.description}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography color="text.secondary" align="center" py={2}>
                                No notifications yet
                            </Typography>
                        )}
                    </List>
                </Box>
                <Box sx={{ marginTop: '1rem' }}>
                    <List sx={{ p: 0 }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{
                                        border: '1px solid black',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.description}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography color="text.secondary" align="center" py={2}>
                                No notifications yet
                            </Typography>
                        )}
                                                {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{
                                        border: '1px solid black',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.description}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography color="text.secondary" align="center" py={2}>
                                No notifications yet
                            </Typography>
                        )}
                                                {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{
                                        border: '1px solid black',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.description}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography color="text.secondary" align="center" py={2}>
                                No notifications yet
                            </Typography>
                        )}
                    </List>
                </Box>
            </Box>
        </Modal>
    );
}
