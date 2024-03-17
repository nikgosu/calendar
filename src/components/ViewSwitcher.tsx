import React from 'react';
import styled from 'styled-components'
import { SELECTED_VIEW } from '../models'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/styledComponents/DateControllerButton'
import { useAppSelector } from '../hooks/redux'

const ViewTypeButtons = styled.div`
    display: flex;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`

const ViewSwitcher = () => {

  const { setSelectedView } = useActions()
  const { selectedView } = useAppSelector(state => state.calendar)

  const handleViewChange = (view: SELECTED_VIEW) => {
    setSelectedView(view)
  }

  return (
    <ViewTypeButtons>
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
    </ViewTypeButtons>
  );
};

export default ViewSwitcher;
