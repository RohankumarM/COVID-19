import React from 'react';
import './styles/Table.css';
import numeral from 'numeral';

function Table({ countries }) {
  return (
      <table className="details">
        <thead className="table__head">
          <tr>
            <th>Country</th>
            <th>Cases</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {countries.map(({ country, cases }, index) => (
            <tr key={index} >
              <td>{country}</td>
              <td><strong>{numeral(cases).format(0, 0)}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Table;
