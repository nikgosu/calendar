import styled from 'styled-components'

export const MyHeader = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme}) => theme.colors.headerBackground};
    background-image: ${({theme}) => theme.colors.headerBackgroundGradient};
    height: 50px;
    color: ${({theme}) => theme.colors.white};
    padding: 0 5%;
`
