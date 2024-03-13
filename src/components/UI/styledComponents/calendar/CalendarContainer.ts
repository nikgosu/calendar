import styled from 'styled-components'

export const CalendarContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.2%;
    overflow: auto;
    
    &::-webkit-scrollbar {
        width: 20px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
`
