import React from 'react';
import HeaderTitle from './HeaderTitle';
import { MyHeader } from './styledComponents/MyHeader'

const Header = () => {
  return (
    <MyHeader>
      <HeaderTitle>My Calendar</HeaderTitle>
    </MyHeader>
  );
};

export default Header;
