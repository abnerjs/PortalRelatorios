import './Header.css';
import ProfileMenu from './subcomponents/ProfileMenu';
import { Typography } from '@mui/material';

import { useAppDispatch } from 'src/store';
import { logout } from 'src/store/ducks/login';
import { useEffect } from 'react';

const Header = (props: { title: any }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isOverflown = (e: any) => {
    return e?.scrollWidth > e?.clientWidth || e?.scrollHeight > e?.clientHeight;
  };

  useEffect(() => {
    let titleElem = document.getElementsByClassName('Header')[0]?.getElementsByTagName('h5')[0];
    if (isOverflown(titleElem)) titleElem.classList.add('overflown');
  });

  return (
    <div className="Header">
      <Typography variant="h5">{props.title}</Typography>
      <div className="right">
        <div className="acesso">
          <Typography variant="subtitle1">Último acesso</Typography>
          <Typography variant="subtitle1">{new Date().toLocaleString()}</Typography>
        </div>
        <ProfileMenu onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
