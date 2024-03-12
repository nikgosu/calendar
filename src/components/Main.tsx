import React from 'react';
import CalendarActions from '../components/CalendarActions'
import Header from '../components/UI/Header'
import Calendar from './Calendar'

const Main = () => {

  return (
    <>
      <Header/>
      <CalendarActions/>
      <Calendar/>
    </>
  );
};

export default Main;
