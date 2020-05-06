import React from 'react';
// import Styled from 'styled-components';

import makeID from '../../helper/makeID';

const HeatMap = () => {
  const rowLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wendesday',
    'Thursday',
    'Friday',
    'Saturday'];

  const columnLables = [
    '',
    '12:00am',
    '',
    '2:00am',
    '',
    '4:00am',
    '',
    '6:00am',
    '',
    '8:00am',
    '',
    '10:00am',
    '',
    '12:00pm',
    '',
    '2:00pm',
    '',
    '4:00pm',
    '',
    '6:00pm',
    '',
    '8:00pm',
    '',
    '10:00pm'];

  const row = 7;
  const col = 24;
  const mapData = Array(row).fill().map(() => Array(col).fill(0));


  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              columnLables.map((label) =>
                <th key={label + "-" + makeID(4)}>{label}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            rowLabels.map((label) => {
              const idx = rowLabels.indexOf(label);
              return (<tr key={label + "-" + makeID(4)}>
                <td>{label}</td>
                {mapData[idx].map((num) =>
                  <td key={makeID(8)} style={{ 'textAlign': 'center' }}>
                    {num}
                  </td>
                )}
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );

}

export default HeatMap;
