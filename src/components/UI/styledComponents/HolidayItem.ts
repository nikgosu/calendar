import styled from 'styled-components'

export const HolidayItem = styled.div`
    padding: ${({theme}) => theme.offsets.dayItemPadding};
    font-size: ${({theme}) => theme.text.dayItem};
    background: #ffd08c;
    border-radius: ${({theme}) => theme.borders.dayItemRadius};
    margin-bottom: ${({theme}) => theme.offsets.dayItemMB};
    color: ${({theme}) => theme.colors.dayItemColor};
    word-wrap: break-word;
    font-weight: ${({theme}) => theme.weight.semiBold};
`
