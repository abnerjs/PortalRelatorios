import React from 'react';
import './Header.css';
import ProfileMenu from './ProfileMenu';
import { Typography } from '@mui/material';

const Header = (props: { title: any }) => {
  return (
    <div className="Header">
      <Typography variant="h5">{props.title}</Typography>
      <div className="right">
        <div className="acesso">
          <Typography variant="subtitle1">Último acesso</Typography>
          <Typography variant="subtitle1">30/06/2021 17:36</Typography>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
