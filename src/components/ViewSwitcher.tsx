import React from 'react';
import styled from 'styled-components'
import { SelectedView } from '../models'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/styledComponents/DateControllerButton'
import { useAppSelector } from '../hooks/redux'

const ViewTypeButtons = styled.div`

`

const ViewSwitcher = () => {

  const { setSelectedView } = useActions()
  const { selectedView } = useAppSelector(state => state.calendar)

  const handleViewChange = (view: SelectedView) => {
    setSelectedView(view)
  }

  return (
    <ViewTypeButtons>
      <DateControllersButton
        onClick={() => handleViewChange(SelectedView.WEEK)}
        $fontSize={'1rem'}
        $color={'#383838'}
        $active={selectedView === SelectedView.WEEK}
      >{SelectedView.WEEK}</DateControllersButton>
      <DateControllersButton
        onClick={() => handleViewChange(SelectedView.MONTH)}
        $fontSize={'1rem'}
        $color={'#383838'}
        $active={selectedView === SelectedView.MONTH}
      >{SelectedView.MONTH}</DateControllersButton>
    </ViewTypeButtons>
  );
};

export default ViewSwitcher;
