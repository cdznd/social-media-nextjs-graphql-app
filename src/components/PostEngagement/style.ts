import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { gray } from '@/components/common/themePrimitives';

export const StyledPostEngagementContainer = styled(Box)(() => ({
    display: 'flex',
    borderTop: '1px solid',
    borderColor: gray[700],
    padding: '.5rem',
}))

export const StyledPostEngagementItem = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid',
    borderColor: gray[600],
    flex: 1,
    transition: '100ms',
}))

export const StyledPostEngagementAction = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    'svg': {
        height: '1.5rem',
        width: '1.5rem'
    }
}))
