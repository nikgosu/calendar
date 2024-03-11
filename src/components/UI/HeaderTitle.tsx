import React, { ReactNode } from 'react';
import styled from 'styled-components'

interface HeaderTitleProps {
  children: ReactNode;
}

const MyHeaderTitle = styled.div`
    font-size: ${({theme}) => theme.text.title};
    font-weight: ${({theme}) => theme.weight.bold};
    cursor: pointer;
`

const HeaderTitle: React.FC<HeaderTitleProps> = ({ children }) => {
  return (
    <MyHeaderTitle>{children}</MyHeaderTitle>
  );
};

export default HeaderTitle;
