import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.main};
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
