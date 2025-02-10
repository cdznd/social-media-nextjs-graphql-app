import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { gray, brand } from '@/components/common/themePrimitives';

export const StyledPostEngagementContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderTop: '1px solid',
    borderColor: gray[700],
    padding: '.5rem'
}))

export const StyledPostEngagementItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid',
    borderColor: gray[600],
    flex: 1,
    transition: '100ms',
    '&:hover svg': {
        color: brand[300]
    }
}))

export const StyledPostEngagementAction = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    'svg': {
        height: '1.5rem',
        width: '1.5rem'
    }
}))
