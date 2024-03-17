import React, { useEffect, useState, ChangeEvent } from 'react';
import MySelect from './UI/MySelect'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/styledComponents/DateControllerButton'
import { ControllersContainer } from './UI/styledComponents/dateController/ControllersContainer'
import { ActionsContainer } from './UI/styledComponents/dateController/ActionsContainer'
import { SearchInput } from './UI/styledComponents/SearchInput'
import useDebounce from '../hooks/useDebounce'

const Controllers = () => {

  const [query, setQuery] = useState('')
  const { calendar, selectedYear, selectedMonth } = useAppSelector(state => state.calendar)
  const { setSelectedYear, setPrevMonth, setNextMonth, setDaysForView, filterTasks } = useActions()

  const debouncedHandleSearch = useDebounce(filterTasks, 500)

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
  }

  const handleMonthChangeClick = (isNext = false) => {
    if (isNext) {
      setNextMonth()
    } else {
      setPrevMonth()
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    debouncedHandleSearch(event.target.value)
  }

  useEffect(() => {
    calendar && setDaysForView()
  }, [calendar, selectedYear, selectedMonth]);

  return (
    <ControllersContainer>
      <ActionsContainer>
        <MySelect
          onSelect={handleYearSelect}
          selectedOption={selectedYear}
          options={Object.values(calendar)}
        />
        <DateControllersButton onClick={() => handleMonthChangeClick()}>&#9652;</DateControllersButton>
        <DateControllersButton onClick={() => handleMonthChangeClick(true)}>&#9662;</DateControllersButton>
      </ActionsContainer>
      <SearchInput
        value={query}
        onChange={handleSearchChange}
        placeholder={'Search'}
      ></SearchInput>
    </ControllersContainer>
  );
};

export default Controllers;
