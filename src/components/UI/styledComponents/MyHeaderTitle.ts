import styled from 'styled-components'

export const MyHeaderTitle = styled.div`
    font-size: ${({theme}) => theme.text.title};
    font-weight: ${({theme}) => theme.weight.bold};
    cursor: pointer;
`
