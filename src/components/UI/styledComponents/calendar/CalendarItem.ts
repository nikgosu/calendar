import styled from 'styled-components'

export const CalendarItem = styled.div<{$active: boolean}>`
    flex: 1 1 13%;
    margin: 0.2%;
    padding: 0.4% 0.2%;
    aspect-ratio: 1 / 0.7;
    background: ${props => props.$active ? 'antiquewhite' : '#faebd785'};
    border-radius: 3px;
`
