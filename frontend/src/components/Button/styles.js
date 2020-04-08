import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

const buttonStyle = css`
  border: none;
  border-radius: 4;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 15px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: background 0.3s;
  text-transform: uppercase;

  background: ${props => props.theme.main};
  color: ${props => props.theme.light};

  :hover {
    background: ${props => darken(0.1, props.theme.main)};
  }

  &:disabled {
    opacity: 0.1;
  }

  ${props =>
    props.secondary &&
    css`
      background: ${props.theme.lightBackground};

      :hover {
        background: ${darken(0.1, props.theme.lightBackground)};
      }
    `};

  svg {
    margin-right: 7px;
  }
`;

export const Button = styled.button`
  ${buttonStyle};
`;

export const ButtonLink = styled(Link)`
  ${buttonStyle};
`;
