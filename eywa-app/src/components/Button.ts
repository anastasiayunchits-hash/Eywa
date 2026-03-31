import styled from 'styled-components';

export const Button = styled.button`
  background: ${(props) => props.theme.colors.primary.mutedPurple};
  color: ${(props) => props.theme.colors.neutrals.softOffWhite};
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-family: ${(props) => props.theme.typography.primaryFont};
  font-size: ${(props) => props.theme.typography.baseFontSize};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.colors.primary.deepAmethyst};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${(props) => props.theme.colors.neutrals.charcoalGrey};
    color: ${(props) => props.theme.colors.neutrals.softOffWhite};
    cursor: not-allowed;
  }
`;
