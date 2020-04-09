import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const StyledButton = Styled.a`
  padding: 9px 15px;
  height: 36px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 0.64;
  background-color: #fdb755;
  color: #ffffff;
  text-transform: uppercase;
  &:hover {
    background: #fcc755;
  }
`;

const Button = ({ children }) => (
  <StyledButton>
    {children}
  </StyledButton>

);

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
