import { Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledUserProfileInfoCard = styled(Card)(({ theme }) => ({
    p: 3,
    textAlign: "center",
    mb: 4,
    display: "flex",
    justifyContent: "start",
    flex: 1
}));

export const StyledUserProfileInfoCardContent = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    p: 3,
    textAlign: "start",
    mb: 4,
    flex: 1
}))