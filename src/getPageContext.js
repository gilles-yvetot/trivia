/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: pink,
    error: red,
    divider: '#EBEDF8',
    background: {
      default: '#f9fbfe',
      paper: '#fff'
    },
    text: {
      secondary: 'rgba(0, 0, 0, 0.5)',
      hint: 'rgba(0, 0, 0, 0.5)'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Oxygen',
    fontSize: 12,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    fontWeightLight: 200,
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: '0px'
      }
    },
    MuiTooltip: {

      tooltip: {
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
        color: 'rgba(0,0,0,1)',
        fontSize: '0.8em',
        fontWeight: 600,
        padding: '8px 12px',
        opacity: 1
      }
    },
    MuiTypography: {
      display1: {
        fontSize: '1.8em',
        opacity: 1,
        color: 'rgba(0,0,0,1)'
      },
      title: {
        fontSize: '1.3em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 1,
        lineHeight: '1.4em',
        fontWeight: 500
      },
      subheading: {
        fontSize: '0.9em',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 1,
      },
      display2: {
        fontSize: '0.7em',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.4em',
        minWidth: 1,
      },
      body2: {
        fontWeight: 300,
        lineHeight: '1.3em',
        fontSize: '0.8em',
      },
      body1: {
        fontWeight: 300,
        lineHeight: '1em',
        fontSize: '0.6em',
      },
      gutterBottom: {
        marginBottom: '6px'
      },
    },
    MuiTabs: {
      flexContainer: {
        height: '100%',
        minHeight: '48px'
      }
    },
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        lineHeight: '1em',
        fontSize: '1em',
        borderRadius: '3px',
      },
    },
    MuiMenuItem: {
      selected: {
        color: '#2196f3',
      },
      root: {
        '&$selected': {
          backgroundColor: '#fff'
        }
      }
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '10000'
      }
    },
    MuiTab: {
      root: {
        height: '100%',
        minHeight: '48px',
        '&:not($selected)': {
          color: 'rgba(0,0,0,0.8)'
        },
        '@media (min-width: 960px)': {
          minWidth: '0px',
        },
      },
      label: {
        '@media (min-width: 960px)': {
          fontSize: '1.2em',
          textTransform: 'capitalize',
        },
        fontSize: '1.2em',
        textTransform: 'capitalize',
      }
    },
    MuiSnackbarContent: {
      message: {
        width: '100%',
        textAlign: 'left'
      },
      root: {
        backgroundColor: pink[700]
      }
    },
    MuiTableCell: {
      body: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '1em'
      },
      root: {
        padding: '8px'
      },
      head: {
        position: 'sticky',
        top: 0,
        color: 'rgba(0, 0, 0, 0.8)',
        backgroundColor: pink[50],
        zIndex: 10
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottomColor: 'rgba(0,0,0,0.1)',
        },
        '&$disabled:before': {
          borderBottomColor: 'rgba(0,0,0,0.1)',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottomColor: pink[500],
        },
        '&:after': {
          borderBottomColor: pink[500],
        },
      },
      root: {
      },
      disabled: {
      }
    },
    MuiTable: {
      root: {
      }
    },
    MuiTableBody: {
      root: {
        overflowY: 'auto'
      }
    },
    MuiCheckbox: {
      root: {
        color: 'rgba(0, 0, 0, 0.3)',
        transform: 'scale(0.85)',
        '&:hover': {
          transform: 'scale(1)',
        },
        transition: [
          ['transform', '200ms']
        ]
      }
    },
    MuiChip: {
      root: {
        fontSize: '0.8em',
        fontWeight: 600,
        borderRadius: '20px',
        padding: '8px 5px',
        color: 'rgba(255,255,255,0.9)',
        boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.3)',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        transition: [
          ['transform', '400ms']
        ]
      },
      deleteIcon: {
        marginLeft: '5px',
        color: 'white',
        '&:hover': {
          color: 'white',
        },
        width: '15px'
      }
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent'
        }
      },
      disabled: {
        '&$select': {
          color: 'rgba(0,0,0,0.16)'
        }
      }
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: '16px'
        }
      }
    },
    MuiCardHeader: {
      content: {
        minWidth: '1px'
      },
      title: {
        fontSize: '0.9em',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 1,
        color: pink[500]
      },
      action: {
        marginTop: 0,
        marginRight: 0
      },
      subheader: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px'
      }
    },
    MuiIconButton: {
      root: {
        width: '20px',
        height: '20px'
      },
    },
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
