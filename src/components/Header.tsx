import React from 'react';
import './Header.css';
import Title from './Title';
import Subtitle from './Subtitle';
import ProfileMenu from './ProfileMenu';

const Header = (props: { title: any }) => {
  return (
    <div className="Header">
      <Title content={props.title} />
      <div className="right">
        <div className="acesso">
          <Subtitle content="Último acesso" />
          <Subtitle content="30/06/2021 17:36" />
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
