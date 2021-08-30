import React, { useState } from "react";
import FormUser from "src/components/FormUser";
import Header from "src/components/Header";
import SectionizedTable from "src/components/SectionizedTable";
import Subtitle from "src/components/Subtitle";
import "./Usuarios.css";

const Usuarios = () => {
  const [isFormOpened, setFormOpened] = useState(false)

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários" />
          <Subtitle content="Todos os usuários no sistema" />
        </div>

        <div className="row">
          <SectionizedTable isFormOpened={isFormOpened} setFormOpened={setFormOpened} />
          <FormUser setFormOpened={setFormOpened} visible={isFormOpened} />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
