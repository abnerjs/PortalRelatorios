import React from 'react';
import './Table.css';

function rows(numrows: number) {
  let arr = [];
  for (let index = 0; index < numrows; index++) {
    arr.push(
      <div className="row">
        <div className="textual">
          <div className="regname">Nome do registro</div>
          <div className="date">26/01/2019 17:50</div>
        </div>
        <button className="reg">ABRIR</button>
      </div>
    );
  }

  return arr;
}

const Table = () => {
  return <div className="Table">{rows(25)}</div>;
};

export default Table;
