import React from 'react';
import styled from 'styled-components'
import { SelectedView } from '../models'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/DateControllerButton'

const ViewTypeButtons = styled.div`

`

const ViewSwitcher = () => {

  const { setSelectedView } = useActions()

  const handleViewChange = (view: SelectedView) => {
    setSelectedView(view)
  }

  return (
    <ViewTypeButtons>
      <DateControllersButton
        onClick={() => handleViewChange(SelectedView.WEEK)}
        $fontSize={'1.2rem'}
        $color={'#383838'}
      >{SelectedView.WEEK}</DateControllersButton>
      <DateControllersButton
        onClick={() => handleViewChange(SelectedView.MONTH)}
        $fontSize={'1.2rem'}
        $color={'#383838'}
      >{SelectedView.MONTH}</DateControllersButton>
    </ViewTypeButtons>
  );
};

export default ViewSwitcher;
