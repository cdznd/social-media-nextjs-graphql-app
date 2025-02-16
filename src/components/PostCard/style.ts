import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { gray } from '@/components/common/themePrimitives';

export const StyledPostCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: 0,
    height: '100%',
    marginBottom: '2rem',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

export const StyledPostCardInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    background: (theme.vars || theme).palette.background.paper
}))

export const StyledPostCardContent = styled(CardContent)({
    padding: '1rem',
    paddingTop: '1rem',
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

export const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const StyledPostCardCategories = styled(Stack)({
    padding: '1rem',
})