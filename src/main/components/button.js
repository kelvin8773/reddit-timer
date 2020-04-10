import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const StyledButton = Styled.button`
  padding: 14px 16px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 0.64;
  background-color: #fdb755;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
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
