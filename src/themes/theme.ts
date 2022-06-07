import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#102445'
        },
        secondary: {
            main: '#F2CD00'
        },
        info: {
            main: '#102445'
        },

    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
        },
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                position: 'fixed',
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#102445',
                    height: 60
                },
            }
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: 30,
                    fontWeight: 600
                },
                h2: {
                    fontSize: 20,
                    fontWeight: 400
                },
                subtitle1: {
                    fontSize: 18,
                    fontWeight: 600
                }
            }
        },
        MuiAlert: {
            defaultProps: {
                color: 'info',
                variant: 'filled',
            }
        },
        MuiButton: {
            defaultProps: {
                color: 'info',
                disableElevation: true,
                size: 'small',
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: 10,
                    ":hover": {
                        backgroundColor: '#F2CD00',
                        color: "black",
                        transition: 'all 0.3s ease-in-out'
                    }
                }
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
                    borderRadius: '10px',
                }
            }
        }
    }
});