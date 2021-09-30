import React, { useState } from 'react';
import FormUser from 'src/components/FormUser';
import Header from 'src/components/Header';
import SectionizedTable from 'src/components/SectionizedTable';
import Subtitle from 'src/components/Subtitle';
import './Usuarios.css';

const Usuarios = () => {
  const [isFormOpened, setFormOpened] = useState(false);
  //const [userSelected, setUserSelected] = useState(undefined)
  const [userSelected, setUserSelected] = useState(-1);
  const [newUserSection, setNewUserSection] = useState(false);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários" />
          <Subtitle content="Todos os usuários no sistema" />
        </div>

        <div className="row">
          <SectionizedTable
            setNewUserSection={setNewUserSection}
            newUserSection={newUserSection}
            userSelected={userSelected}
            setUserSelected={setUserSelected}
            isFormOpened={isFormOpened}
            setFormOpened={setFormOpened}
          />
          <FormUser
            setNewUserSection={setNewUserSection}
            userSelected={userSelected}
            setUserSelected={setUserSelected}
            setFormOpened={setFormOpened}
            visible={isFormOpened}
          />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
