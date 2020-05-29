import Styled from 'styled-components';

const Button = Styled.button`
  padding: 14px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 0.64;
  background-color: #fdb755;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  outline: none;
  &:hover {
    background: #fcc755;
    cursor: pointer;
  }
`;

export default Button;
