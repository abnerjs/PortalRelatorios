import React, { useRef, useState } from 'react';
import './ProfileMenu.css';
import { Icon } from '@iconify/react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Avatar } from '@mui/material';
import { getInitialsFromString } from 'src/utils/StringUtils';

import { useAppSelector } from 'src/store';

interface ProfileMenuProps {
  onClickProfile?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onLogout?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ProfileMenu = (props: ProfileMenuProps) => {
  const user = useAppSelector((state) => state.session.user);

  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setCollapsed(false);
  });

  return (
    <div className="ProfileMenu" ref={ref}>
      <div className="collapseToggle" onClick={() => setCollapsed(!collapsed)}>
        <Avatar
          sx={{ bgcolor: '#1878a1' }}
          children={getInitialsFromString(user?.nomUsuario || '')}
          style={{
            fontSize: '12pt',
            margin: '0 10px 0 0',
            fontWeight: 800,
          }}
        />
        <Icon icon="fluent:chevron-down-20-filled" />
      </div>

      <div className={`menuCollapse${collapsed ? ' active' : ''}`}>
        {/* 
          <div className="item" onClick={props.onClickProfile}>
            <p>MEU PERFIL</p>
          </div> 
        */}
        <div className="item" onClick={props.onLogout}>
          <p>SAIR</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
