import styled from 'styled-components'

export const CalendarItemCardAmount = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    font-weight: bold;
    font-size: .75rem;
    color:  ${({theme}) => theme.colors.primary};
    line-height: 1;
    margin-left: 4px;
`
