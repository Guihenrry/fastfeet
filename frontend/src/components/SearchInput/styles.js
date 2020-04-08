import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 237px;
  padding: 0 15px 0 40px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
`;

export const SearchButton = styled.button`
  position: absolute;
  height: 36px;
  width: 40px;
  border: none;
  background: none;
`;
