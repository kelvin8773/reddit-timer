import React, { useState } from 'react';
import Styled from 'styled-components';
import {
  useSelector,
} from 'react-redux';

import {
  HEATMAP_WEEKDAY_LABELS,
  HEATMAP_HOUR_LABELS,
  HEATMAP_COLORS,
} from '../../config/constants';

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
  box-sizing: border-box;
  width: 40px;
  font-size: 14px;
  font-weight: bold;
  line-height: 0.64;
  color: white;
  text-align: center;
  background-color: 
    ${(props) => HEATMAP_COLORS[props.postNumber] || HEATMAP_COLORS[10]};

  &:hover {
    cursor: pointer;
    border: 1px solid  ${(props) => props.theme.colors.grayBase};
  }
  
  ${(props) => (props.clicked
    ? `border: 1px solid ${props.theme.colors.grayBase};`
    : '')}
`;

const HeatMapTimezone = Styled.div`
  margin-top: 12px;
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.colors.grayBase};
`;


const HeatMap = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const posts = useSelector((state) => state.posts);
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const getIndex = (weekday, hour) => weekday * 100 + hour;

  return (
    <HeatMapContainter>
      <HeatMapCoLabels>
        {
          HEATMAP_HOUR_LABELS.map((label) => (
            <HeapMapCoLabel key={label}>
              {label}
            </HeapMapCoLabel>
          ))
        }
      </HeatMapCoLabels>

      <table>
        <tbody>
          {
            HEATMAP_WEEKDAY_LABELS.map((label, dayOfWeek) => (
              <tr key={label}>
                <HeatMapRowLabel>{label}</HeatMapRowLabel>
                {posts[dayOfWeek].map((data, timeSlot) => (
                  <HeatMapCell
                    key={getIndex(dayOfWeek, timeSlot)}
                    postNumber={data.length}
                    clicked={clickedIndex === getIndex(dayOfWeek, timeSlot)}
                    onClick={() => setClickedIndex(getIndex(dayOfWeek, timeSlot))}
                  >
                    {data.length}
                  </HeatMapCell>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>

      <HeatMapTimezone>
        All times are shown in your timezone:&nbsp;
        <strong>{localTimezone}</strong>
      </HeatMapTimezone>
    </HeatMapContainter>
  );
};

export default HeatMap;
