import React from 'react';
import './styles/Table.css';
import numeral from 'numeral';

function Table({ countries }) {
  return (
    <div className="table">
      <table>
      {countries.map(({ country, cases }, index) => (
      <tbody key={index}>
        <tr>
          <td>{country}</td>
          <td><strong>{numeral(cases).format(0,0)}</strong></td>
        </tr>
        </tbody>
      ))}
      </table>
    </div>
  )
}

export default Table;
