import { styled } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    minHeight: '200px',
    fontFamily: 'inherit',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#4B5563' : '#E5E7EB'}`,
    backgroundColor: theme.palette.mode === 'dark' ? '#1F2937' : '#FFFFFF',
    color: theme.palette.mode === 'dark' ? '#F3F4F6' : '#111827',
    boxShadow: `0 1px 2px 0 ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    resize: 'none',
    '&:hover': {
      borderColor: theme.palette.mode === 'dark' ? '#6B7280' : '#9CA3AF',
    },
    '&:focus': {
      borderColor: theme.palette.mode === 'dark' ? '#3B82F6' : '#2563EB',
      boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.5)'}`,
      outline: 'none',
    },
    '&::placeholder': {
      color: theme.palette.mode === 'dark' ? '#9CA3AF' : '#6B7280',
    },
}));
