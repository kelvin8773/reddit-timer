import React, { useState } from 'react';
import Styled from 'styled-components';
import {
  useSelector,
} from 'react-redux';

import {
  ROW_LABELS,
  COL_LABELS,
  HEATMAP_COLORS,
} from '../../config/constants';
import dayjs from 'dayjs';
import makeID from '../../helper/makeID';

const HeatMapContainter = Styled.div`
  margin-top: 61px;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
`;

const HeatMapCoLabels = Styled.div`
  align-self: flex-end;
  display: flex;
  justify-Content: flex-end;
  align-items: center;
  border: solid 1px #f3f3f3;
  width: 960px;
`;

const HeapMapCoLabel = Styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 50px;
  font-size: 14px;
  font-weight: 500;
  background-image: linear-gradient(to bottom, #fefefe, #e9e9e9);
  color: #787878;
`;

const HeatMapRowLabel = Styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 154px;
  height: 40px;
  background-color: #1e2537;
  font-size: 15px;
  font-weight: 600;
  line-height: 0.73;
  color: white;
`;

const HeatMapCell = Styled.td`
  width: 40px;
  font-size: 14px;
  font-weight: bold;
  line-height: 0.64;
  color: white;
  text-align: center;
  background-color: 
    ${props => HEATMAP_COLORS[props.postNumber] || HEATMAP_COLORS[10]};
  &:hover {
    cursor: pointer;
    border: 1px solid  ${props => props.theme.colors.grayBase};
    width:38px;
    max-height:38px;
  }
  ${props => props.clicked === props.data ?
    `border: 1px solid ${props.theme.colors.grayBase};
    width: 38px;
    max-height: 38px;`
    : ``}
`;

const HeatMapTimezone = Styled.div`
  margin-top: 12px;
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.colors.grayBase};
`;

const HeatMap = () => {
  const [clicked, setClicked] = useState(-1);
  const posts = useSelector((state) => state.posts);
  const getHeatMapData = (posts) => {
    const result = new Array(7).fill().map(() => new Array(24).fill().map(() => []));
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
    <HeatMapContainter>
      <HeatMapCoLabels >
        {
          COL_LABELS.map((label) =>
            <HeapMapCoLabel key={label + "-" + makeID(4)} >
              {label}
            </HeapMapCoLabel>
          )
        }
      </HeatMapCoLabels>

      <table>
        <tbody>
          {
            ROW_LABELS.map((label) => {
              const dayOfWeek = ROW_LABELS.indexOf(label);
              return (<tr key={label + "-" + makeID(4)}>
                <HeatMapRowLabel>{label}</HeatMapRowLabel>
                {heatMapData[dayOfWeek].map((posts, timeSlot) =>
                  <HeatMapCell key={makeID(8)}
                    data={dayOfWeek * 100 + timeSlot}
                    postNumber={posts.length}
                    clicked={clicked}
                    onClick={() => setClicked(dayOfWeek * 100 + timeSlot)}
                  >
                    {posts.length}
                  </HeatMapCell>
                )}
              </tr>
              )
            })
          }
        </tbody>
      </table>

      <HeatMapTimezone>
        All times are shown in your timezone:<strong>{localTimezone}</strong>
      </HeatMapTimezone>
    </HeatMapContainter>
  );

}

export default HeatMap;
