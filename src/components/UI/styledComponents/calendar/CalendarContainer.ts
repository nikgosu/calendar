import styled from 'styled-components'

export const CalendarContainer = styled.div<{$isAnimateNext?: boolean, $isAnimatePrev?: boolean}>`
    margin: 0;
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 0;
    flex: 1 1 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
`
