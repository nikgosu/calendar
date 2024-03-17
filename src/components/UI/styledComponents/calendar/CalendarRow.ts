import styled, { keyframes } from 'styled-components'

const keyFramesNext = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(10%);
    }
`
const keyFramesPrev = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-10%);
    }
`


export const CalendarRow = styled.div<{$isAnimateNext?: boolean, $isAnimatePrev?: boolean}>`
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 0;
    flex: 1 1 0;
    animation-name: ${({ $isAnimateNext, $isAnimatePrev }) => $isAnimateNext ? keyFramesNext : $isAnimatePrev ? keyFramesPrev : ''};
    animation-duration: 0.2s;
    animation-fill-mode: backwards;
    animation-timing-function: ease-in-out;
`
