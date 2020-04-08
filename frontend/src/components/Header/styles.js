import styled from 'styled-components';
import { darken } from 'polished';
import { Link, NavLink } from 'react-router-dom';

export const Header = styled.header`
  background: ${props => props.theme.light};
  border: 1px solid ${props => props.theme.border};
  padding: 0 30px;
  height: 64px;
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;

  @media only screen and (max-width: 850px) {
    height: 100vh;
    width: 64px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
  }
`;

export const LogoLink = styled(Link)``;

export const Logo = styled.img`
  width: 135px;

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

export const LogoMobile = styled.img`
  display: none;

  @media only screen and (max-width: 850px) {
    display: block;
  }
`;

export const Menu = styled.nav``;

export const MenuList = styled.ul`
  display: flex;
  padding-left: 30px;
  border-left: 1px solid ${props => props.theme.border};
  margin-left: 30px;

  @media only screen and (max-width: 850px) {
    flex-direction: column;
    padding-left: 0;
    border-left: 0;
    margin-left: 0;
  }
`;

export const MenuItem = styled.li`
  &:not(:last-child) {
    margin: 0 21px 0 0;
  }

  @media only screen and (max-width: 850px) {
    &:not(:last-child) {
      margin: 0 0 40px 0;
    }
  }
`;

export const MenuLink = styled(NavLink)`
  color: ${props => props.theme.focus};
  font-size: 0.9375rem;
  font-weight: bold;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  &.active,
  :hover {
    color: ${props => props.theme.text};
  }

  svg {
    display: none;
  }

  @media only screen and (max-width: 850px) {
    font-size: 0;
    width: 64px;

    svg {
      display: block;
      fill: ${props => props.theme.focus};
    }

    &.active svg {
      fill: ${props => props.theme.main};
    }
  }
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.strong`
  color: ${props => props.theme.medium};
  font-size: 0.875rem;
  margin-bottom: 5px;

  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

export const ButtonSignOut = styled.button`
  border: none;
  background: none;
  color: ${props => props.theme.danger};
  font-size: 0.875rem;

  svg {
    display: none;
  }

  &:hover {
    color: ${props => darken(0.1, props.theme.danger)};
  }

  @media only screen and (max-width: 850px) {
    svg {
      display: inline-block;
    }
    width: 64px;
    font-size: 0;
  }
`;
