import React from 'react';
import { Holiday } from '../../models'
import { HolidayItem } from '../UI/styledComponents/HolidayItem'

interface HolidaysListProps {
  holidays: Holiday[] | undefined
}

const HolidaysList = ({holidays}: HolidaysListProps) => {
  return (
    <div>
      {holidays?.map((holiday: Holiday) => (
        <HolidayItem key={holiday.id}>{holiday.name}</HolidayItem>
      ))}
    </div>
  );
};

export default HolidaysList;
