import styled from 'styled-components';
import { Header, Row } from '~/components/Table';

export const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 34px 15px;
`;

export const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: 1.5rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 34px 0 22px;

  @media only screen and (max-width: 470px) {
    flex-direction: column;

    input {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const Table = styled.section``;

export const TableHeader = styled(Header)`
  grid-template-columns: 60px repeat(3, 1fr) 70px;
`;

export const TableRow = styled(Row)`
  grid-template-columns: 60px repeat(3, 1fr) 70px;
`;

export const AvatarWrraper = styled.div`
  @media only screen and (max-width: 850px) {
    grid-area: 1;
  }
`;

export const ActionsWrraper = styled.div`
  @media only screen and (max-width: 850px) {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 80px;

    > div > button {
      justify-content: flex-end;
    }
  }
`;

export const ColumnTitle = styled.strong`
  color: ${props => props.theme.text};
  font-size: 1rem;
  margin-right: 5px;
  display: none;

  @media only screen and (max-width: 850px) {
    display: inline-block;
  }
`;
