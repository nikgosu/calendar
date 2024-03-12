import React, { useState } from 'react';
import styled from 'styled-components'

const Main = styled.div`
    font-family: sans-serif;
    background: #f0f0f0;
`;

const DropDownContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    position: relative;
    &:before {
        content: '›';
        top: 50%;
        right: 10%;
        position: absolute;
        z-index: 2;
        font-size: 1.65rem;
        font-weight: bold;
        color: #969b9b;
        transform: translateY(-50%) rotate(90deg);
        pointer-events: none;
    }
    &:hover {
        cursor: pointer;
        background: #cccaca;
    }
`;

const DropDownOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const DropDownHeader = styled.div`
    padding: 7px 35px 7px 17.5px;
    box-sizing: border-box;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 1.1rem;
    color: #7a7a7a;
`;

const DropDownListContainer = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
`;

const DropDownList = styled.ul`
    padding: 0;
    margin: 0;
    padding-left: 1em;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    color: #7a7a7a;
    font-size: 1.1rem;
    font-weight: 500;

    &:first-child {
        padding-top: 0.6em;
    }
`;

const ListItem = styled.li`
    list-style: none;
    margin-bottom: 0.8em;

    &:hover {
        color: #fd9e46;
        cursor: pointer;
    }
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
          {selectedOption || 'Mangoes'}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option.value)}
                  key={option.id}
                >
                  {option.value}
                </ListItem>
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
