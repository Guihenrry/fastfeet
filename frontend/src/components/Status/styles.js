import styled, { css } from 'styled-components';

export const Status = styled.span`
  text-transform: uppercase;
  padding: 3px 6px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: bold;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 7px;
  }

  ${props =>
    props.type === 'ENTREGUE' &&
    css`
      background: ${props.theme.successLight};
      color: ${props.theme.success};

      &::before {
        background: ${props.theme.success};
      }
    `}

  ${props =>
    props.type === 'RETIRADA' &&
    css`
      background: ${props.theme.infoLight};
      color: ${props.theme.info};

      &::before {
        background: ${props.theme.info};
      }
    `}

  ${props =>
    props.type === 'PENDENTE' &&
    css`
      background: ${props.theme.warningLight};
      color: ${props.theme.warning};

      &::before {
        background: ${props.theme.warning};
      }
    `}

  ${props =>
    props.type === 'CANCELADA' &&
    css`
      background: ${props.theme.dangerLight};
      color: ${props.theme.danger};

      &::before {
        background: ${props.theme.danger};
      }
    `}
`;
