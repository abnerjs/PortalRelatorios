import React from 'react';
import './Header.css';
import ProfileMenu from './ProfileMenu';
import { Typography } from '@mui/material';

import { useAppDispatch } from 'src/store';
import { logout } from 'src/store/ducks/login';

const Header = (props: { title: any }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="Header">
      <Typography variant="h5">{props.title}</Typography>
      <div className="right">
        <div className="acesso">
          <Typography variant="subtitle1">Último acesso</Typography>
          <Typography variant="subtitle1">
            {new Date().toLocaleString()}
          </Typography>
        </div>
        <ProfileMenu onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
