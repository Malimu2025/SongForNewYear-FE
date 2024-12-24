import styled from 'styled-components';

export const Button = ({ text, color, onClick }) => {
  // color는 'yellow', 'brown' 둘 중 하나
  return <Container $color={color} onClick={onClick}>{text}</Container>;
};

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  font-size: 1.875rem;
  padding: 0.31rem 0;
  box-sizing: border-box;

  background-color: ${({ $color }) =>
    $color == 'brown' ? '#8B7966' : '#ffe4a4'};
  color: ${({ $color }) => ($color == 'brown' ? 'white' : '#6b5743')};
  border-radius: 3.125rem;
  border: 1.5px solid #6b5743;
`;
