import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { ReactComponent as spinner } from './loading-spinner.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = Styled(spinner)`
  margin-top: 56px;
  animation: ${rotate} 1.5s linear infinite;
`;

const Spinner = () => (
  <div data-testid="loadSpinner">
    <StyledSpinner />
  </div>
);


export default Spinner;
