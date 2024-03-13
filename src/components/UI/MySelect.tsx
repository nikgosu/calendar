import React, { useState } from 'react';
import styled from 'styled-components'
import { DropDownContainer } from './styledComponents/dropDown/DropDownContainer'
import { DropDownListItem } from './styledComponents/dropDown/DropDownListItem'
import { DropDownListContainer } from './styledComponents/dropDown/DropDownListContainer'
import { DropDownHeader } from './styledComponents/dropDown/DropDownHeader'
import { DropDownList } from './styledComponents/dropDown/DropDownList'
import { DropDownOverlay } from './styledComponents/dropDown/DropDownOverlay'

const Main = styled.div`
    background: #f0f0f0;
`;

interface MySelectProps {
  selectedOption: any
  options: any[]
  onSelect: (value: any) => void
}

const MySelect = ({ selectedOption, options, onSelect }: MySelectProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any) => () => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <DropDownListItem
                  onClick={onOptionClicked(option.value)}
                  key={option.id}
                >
                  {option.value}
                </DropDownListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      {isOpen && (
        <DropDownOverlay onClick={() => setIsOpen(false)}/>
      )}
    </Main>
  );
};

export default MySelect;
