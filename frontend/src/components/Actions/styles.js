import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const Wrraper = styled.div`
  position: relative;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: ${props => props.theme.focus};

  :hover {
    fill: ${props => props.theme.medium};
  }
`;

export const Actions = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  background: ${props => props.theme.light};
  padding: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  width: ${props => (props.large ? '200px' : '150px')};
  left: ${props => (props.large ? '-140px' : '-100px')};
  top: 30px;
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
  z-index: 5;

  :before {
    content: '';
    position: absolute;
    top: -8px;
    left: ${props => (props.large ? '168px' : '98px')};
    width: 15px;
    height: 15px;
    background: ${props => props.theme.light};
    transform: rotate(45deg);
    @media only screen and (max-width: 850px) {
      display: none;
    }
  }

  @media only screen and (max-width: 850px) {
    left: ${props => (props.large ? '-120px' : '-100px')};
  }
`;

export const ActionArrow = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 21px;
  left: 28px;
  width: 15px;
  height: 15px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  background: ${props => props.theme.light};
  transform: rotate(45deg);
  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

export const ActionsItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  background: 0;
  border: 0;
  padding: 5px 0;
  font-size: 1rem;
  color: ${props => props.theme.focus};

  :hover {
    color: ${props => props.theme.medium};
  }

  > svg {
    margin-right: 5px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderLight};
  }
`;
