import React from 'react';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

type IconsProps = {
  firstIcon?: any;
  secondIcon?: any;
  noIcon?: boolean;
};

const DmIconifiedSwitch = styled(
  ({ noIcon, ...rest }: SwitchProps & IconsProps) => (
    <Switch disableRipple {...rest} />
  )
)(({ theme, noIcon }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: !noIcon
          ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" height="20" width="20" preserveAspectRatio="xMidYMid meet" viewBox="-6 -6 48 48"><path fill="${encodeURIComponent(
              '#23ACE6'
            )}" d="M4.22 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2.14 2.14 0 0 0 .43 0L13 32l15.84-15.78L20 7.4z"/><path fill="${encodeURIComponent(
              '#23ACE6'
            )}" d="M33.82 8.32l-5.9-5.9a2.07 2.07 0 0 0-2.92 0L21.72 5.7l8.83 8.83l3.28-3.28a2.07 2.07 0 0 0-.01-2.93z"/></svg>')`
          : '',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: '#23ace6',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: !noIcon
        ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" height="18" width="18" preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12"><g fill="none"><path fill="${encodeURIComponent(
            '#aaa'
          )}" d="M1.974 6.659a.5.5 0 0 1-.948-.317c-.01.03 0-.001 0-.001a1.661 1.661 0 0 1 .062-.162c.04-.095.099-.226.18-.381c.164-.31.422-.723.8-1.136C2.835 3.827 4.088 3 6 3c1.913 0 3.166.827 3.931 1.662a5.473 5.473 0 0 1 .98 1.517c.02.047.035.085.045.113c.004.008.014.06.024.11c.009.046.017.09.02.098c0 0 .084.333-.342.474a.5.5 0 0 1-.632-.314v-.003l-.007-.016a3.676 3.676 0 0 0-.172-.376a4.477 4.477 0 0 0-.653-.927C8.584 4.673 7.587 4 6 4s-2.584.673-3.194 1.338a4.477 4.477 0 0 0-.795 1.225a2.184 2.184 0 0 0-.03.078l-.007.018z"/><path fill="${encodeURIComponent(
            '#aaa'
          )}" d="M4 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0z"/></g></svg>')`
        : '',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default DmIconifiedSwitch;
