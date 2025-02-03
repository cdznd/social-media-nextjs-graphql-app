"use client"

import { Card, Typography, Box, IconButton, Menu, MenuItem, Alert } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import PostCard from "@/components/PostCard";

type PostListCardProps = {
    title: String,
    posts: any[]
}

const PostListCard = ({ title, posts }: PostListCardProps) => {

    const onDeleteAll = () => {
        const x = window.confirm('Are you sure!')
        if (x) {

        }
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderPosts =
        posts.map((post, key) => {
            return <PostCard postData={post} key={key} />
        })

    return (
        <Card
            sx={{
                p: 3,
                textAlign: "center",
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                boxShadow: 3,
                borderRadius: 2
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    {title}
                </Typography>
                {/* Dropdown Menu */}
                <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon />
                </IconButton>
                {/* Dropdown Menu */}
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
                            onDeleteAll();
                        }}
                    >
                        Delete All Posts
                    </MenuItem>
                </Menu>
            </Box>

            {posts.length > 0 ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 2,
                    }}
                >
                    {renderPosts}
                </Box>
            ) : <Alert severity="info">No Posts to display</Alert>}

        </Card>
    );
};

export default PostListCard;
