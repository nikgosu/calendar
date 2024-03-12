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

const HeaderTitle = ({ children }: HeaderTitleProps) => {
  return (
    <MyHeaderTitle>{children}</MyHeaderTitle>
  );
};

export default HeaderTitle;
