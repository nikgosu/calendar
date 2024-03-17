import React from 'react';
import { SELECTED_VIEW } from '../models'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/styledComponents/DateControllerButton'
import { useAppSelector } from '../hooks/redux'
import { ViewTypeButtonsContainer } from './UI/styledComponents/ViewTypeButtonsContainer'

const ViewSwitcher = () => {

  const { setSelectedView } = useActions()
  const { selectedView } = useAppSelector(state => state.calendar)

  const handleViewChange = (view: SELECTED_VIEW) => {
    setSelectedView(view)
  }

  return (
    <ViewTypeButtonsContainer>
      <DateControllersButton
        onClick={() => handleViewChange(SELECTED_VIEW.WEEK)}
        $fontSize={'1rem'}
        $color={'#383838'}
        $active={selectedView === SELECTED_VIEW.WEEK}
      >{SELECTED_VIEW.WEEK}</DateControllersButton>
      <DateControllersButton
        onClick={() => handleViewChange(SELECTED_VIEW.MONTH)}
        $fontSize={'1rem'}
        $color={'#383838'}
        $active={selectedView === SELECTED_VIEW.MONTH}
      >{SELECTED_VIEW.MONTH}</DateControllersButton>
    </ViewTypeButtonsContainer>
  );
};

export default ViewSwitcher;
