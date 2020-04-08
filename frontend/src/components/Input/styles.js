import styled from 'styled-components';

export const Label = styled.label`
  color: ${props => props.theme.text};
  font-weight: bold;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  color: ${props => props.theme.text};
  font-size: 1rem;
  display: block;
  width: 100%;
  border: 1px solid
    ${props => (props.invalid ? props.theme.dangerLight : props.theme.border)};
  padding: 12px 15px;
  border-radius: 4px;
  margin: 9px 0 5px;

  &:focus {
    border-color: ${props =>
      props.invalid ? props.theme.danger : props.theme.focus};
  }
`;

export const HelpText = styled.span`
  font-weight: normal;
  text-transform: none;
  display: block;
  margin-bottom: 15px;
`;
