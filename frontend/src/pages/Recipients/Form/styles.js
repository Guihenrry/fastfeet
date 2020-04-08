import styled from 'styled-components';

export const Container = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 15px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.focus};
  font-size: 1.5rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const FormRow = styled.div`
  &:nth-child(2) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 16px;
  }

  &:nth-child(3) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  @media only screen and (max-width: 600px) {
    &:nth-child(2),
    &:nth-child(3) {
      grid-template-columns: 1fr;
    }
  }
`;

export const Form = styled.form`
  background: ${props => props.theme.light};
  padding: 30px;
  border-radius: 4px;
`;
