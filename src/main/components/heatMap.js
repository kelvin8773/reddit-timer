import React from 'react';
// import Styled from 'styled-components';
import {
  useSelector,
} from 'react-redux';

import {
  ROW_LABELS,
  COL_LABELS
} from '../../config/constants';
import dayjs from 'dayjs';
import makeID from '../../helper/makeID';

const HeatMap = () => {
  const posts = useSelector((state) => state.posts);
  const getHeatMapData = (posts) => {
    const result = Array(7).fill().map(() => Array(24).fill(0));
    for (let i = 0; i < posts.length - 1; i++) {
      const time = dayjs.unix(posts[i].created_utc);
      const dayOfWeek = time.day();
      const timeSlot = time.hour();
      result[dayOfWeek][timeSlot] += 1;
    }
    return result;
  };

  const heatMapData = getHeatMapData(posts);
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              COL_LABELS.map((label) =>
                <th key={label + "-" + makeID(4)}>{label}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            ROW_LABELS.map((label) => {
              const idx = ROW_LABELS.indexOf(label);
              return (<tr key={label + "-" + makeID(4)}>
                <td>{label}</td>
                {heatMapData[idx].map((num) =>
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
      <p style={{ 'textAlign': 'center' }}>
        All times are show in your timezone: <strong>{localTimezone}</strong>
      </p>
    </div>
  );

}

export default HeatMap;
