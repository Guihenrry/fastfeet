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
  margin-bottom: 34px;
`;

export const Table = styled.section``;

export const TableHeader = styled(Header)`
  grid-template-columns: 200px 1fr 70px;
`;

export const TableRow = styled(Row)`
  grid-template-columns: 200px 1fr 70px;
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

export const ModalContent = styled.p`
  color: ${props => props.theme.medium};
  line-height: 1.5;
`;

export const ModalTitle = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => props.theme.text};
  font-size: 0.875rem;
  margin-bottom: 5px;
`;
