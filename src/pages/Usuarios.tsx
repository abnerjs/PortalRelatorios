import React from "react";
import Header from "src/components/Header";
import SectionizedTable from "src/components/SectionizedTable";
import Subtitle from "src/components/Subtitle";
import "./Usuarios.css";

const Usuarios = () => {
  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários" />
          <Subtitle content="Todos os usuários no sistema" />
        </div>

        <div className="row">
          <SectionizedTable />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
