import React, { useRef, useState } from 'react';
import './ProfileMenu.css';
import { Icon } from '@iconify/react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Avatar } from '@mui/material';
import { getInitialsFromString, stringToColor } from 'src/utils/StringUtils';

const ProfileMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setCollapsed(false);
  });

  return (
    <div className="ProfileMenu" ref={ref}>
      <div className="collapseToggle" onClick={() => setCollapsed(!collapsed)}>
        <Avatar
          sx={{ bgcolor: stringToColor('Abner José da Silva') }}
          children={getInitialsFromString('Abner José da Silva')}
        />
        <Icon icon="fluent:chevron-down-20-filled" />
      </div>

      <div className={`menuCollapse${collapsed ? ' active' : ''}`}>
        <div className="item">
          <p>MEU PERFIL</p>
        </div>
        <div className="item">
          <p>SAIR</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
