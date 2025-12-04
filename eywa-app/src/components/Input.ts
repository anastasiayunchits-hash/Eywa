import styled from 'styled-components';

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  color: ${(props) => props.theme.colors.neutrals.softOffWhite};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 10px;
  font-family: ${(props) => props.theme.typography.primaryFont};
  font-size: ${(props) => props.theme.typography.baseFontSize};
  width: 100%;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.softLavender};
  }
`;
