import React from 'react';
import Styled from 'styled-components';
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
    const result = new Array(7).fill()
      .map(() => new Array(24).fill()
        .map(() => new Array()));


    for (let i = 0; i < posts.length; i++) {
      const time = dayjs.unix(posts[i].created_utc);
      const dayOfWeek = time.day();
      const timeSlot = time.hour();
      result[dayOfWeek][timeSlot].push(posts[i]);
    }
    return result;
  };

  const heatMapData = getHeatMapData(posts);
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div>
      <div style={{ 'display': 'flex', 'justifyContent': 'flex-end' }}>
        {
          COL_LABELS.map((label) =>
            <span key={label + "-" + makeID(4)} >
              {label}
            </span>
          )
        }
      </div>
      <table>

        <tbody>
          {
            ROW_LABELS.map((label) => {
              const idx = ROW_LABELS.indexOf(label);
              return (<tr key={label + "-" + makeID(4)}>
                <td>{label}</td>
                {heatMapData[idx].map((posts) =>
                  <td key={makeID(8)}
                    style={{ 'textAlign': 'center', 'width': '40px' }}>
                    {posts.length}
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
