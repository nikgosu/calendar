import React from 'react';
import styled from 'styled-components'
import HeaderTitle from './HeaderTitle';

const MyHeader = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme}) => theme.colors.headerBackground};
    background-image: ${({theme}) => theme.colors.headerBackgroundGradient};
    height: 50px;
    color: ${({theme}) => theme.colors.white};
    padding: 0 5%;
`

const Header = () => {
  return (
    <MyHeader>
      <HeaderTitle>My Calendar</HeaderTitle>
    </MyHeader>
  );
};

export default Header;
