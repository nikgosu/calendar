import styled from 'styled-components'

export const CalendarItemDay = styled.div<{$active: boolean}>`
    display: flex;
    align-items: center;
    flex-grow: 0;
    padding: 0 2%;
    font-weight: bold;
    line-height: 1;
    color: ${props => props.$active ? '#383838' : '#7a7a7a'};
`
