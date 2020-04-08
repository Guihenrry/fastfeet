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

export const Form = styled.form`
  background: ${props => props.theme.light};
  padding: 30px;
  border-radius: 4px;
`;

export const FormRow = styled.div`
  &:nth-child(1) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
`;

export const Label = styled.label``;

export const LabelText = styled.p`
  margin-bottom: 9px;
  color: ${props => props.theme.text};
  font-weight: bold;
`;

export const HelpText = styled.span`
  font-weight: normal;
  text-transform: none;
  display: block;
  margin-bottom: 15px;
`;
