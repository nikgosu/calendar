import React, { ReactNode } from 'react';
import { MyHeaderTitle } from './styledComponents/MyHeaderTitle'

interface HeaderTitleProps {
  children: ReactNode;
}

const HeaderTitle = ({ children }: HeaderTitleProps) => {
  return (
    <MyHeaderTitle>{children}</MyHeaderTitle>
  );
};

export default HeaderTitle;
