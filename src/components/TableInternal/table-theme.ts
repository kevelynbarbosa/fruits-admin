export const vixTheme = {
  text: {
    primary: '#aab2bd',
  },
  background: {
    default: '#fff',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    // default: 'transparent',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}

export const vixStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      padding: '10px',
    },
  },
  headRow: {
    style: {
      fontWeight: 'normal',
    },
    denseStyle: {
      minHeight: '32px',
    },
  },
  rows: {
    style: {
      borderRadius: 5,
      marginTop: '3px',
      borderColor: 'transparent',
      transition: 'all ease-in-out 0.3s',
    },
    selectedHighlightStyle: {
      '&:nth-of-type(n)': {
        backgroundColor: '#fff',
        borderBottomColor: 'transparent',
        boxShadow: '0 0 5px 3px #e6e9ed',
        transition: 'all ease-in-out 0.3s',
      },
    },
  },
  head: {
    style: {
      color: 'red',
    },
  },
  cells: {
    style: {
      color: '#434a54',
      fontFamily: 'helveticaNeue-regular',
    },
  },
}
