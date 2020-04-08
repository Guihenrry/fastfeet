import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 60px repeat(5, 1fr) 70px;
  padding: 0 0 14px 25px;

  strong {
    color: ${props => props.theme.text};
    font-size: 1rem;
  }

  strong:last-child {
    text-align: center;
  }

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

export const Row = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 60px repeat(5, 1fr) 70px;
  align-items: center;
  border-radius: 4px;
  background: ${props => props.theme.light};
  padding: 0 0 0 25px;
  min-height: 57px;
  margin-bottom: 21px;

  &.anima-enter {
    opacity: 0;
    transform: translate3d(0, 5px, 0);
  }

  &.anima-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 500ms;
  }

  &.anima-exit {
    opacity: 1;
  }

  &.anima-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }

  p {
    font-size: 1rem;
    color: ${props => props.theme.medium};
  }

  @media only screen and (max-width: 850px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 10px;
  }
`;
