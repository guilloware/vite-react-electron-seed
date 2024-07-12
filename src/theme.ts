import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true, // example
            },
        },
    },
});

export const colors = {
    debugRed: '#ff5d5d',
};

export default theme;
