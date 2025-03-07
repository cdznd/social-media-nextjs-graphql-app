import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import theme from '../common/theme';

/**
 * Comments about the use of AppRouterCacheProvider for MUI
 * Emotion works OK without this provider but it's recommended 
 * to use this provider to improve performance.
 * Without it, Emotion will generate a new tag during SSR for every component.
 */
export default function CustomThemeProvider(
    { children }: { children: React.ReactNode }
) {
    return (
        <AppRouterCacheProvider
            options={{ key: 'css' }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}