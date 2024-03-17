import styled from 'styled-components'

export const SearchInput = styled.input`
    margin-left: 10px;
    border: 2px solid #cccaca;
    border-radius: 6px;
    font-size: ${({theme}) => theme.text.standard};
    color: #514d4d;
    padding: 4px 8px;
    
    &:focus-visible {
        outline: none;
        border: 2px solid #383838b0;
    }
    
    @media (max-width: 923px) {
        margin-left: 0;
        width: fit-content;
        margin-top: 10px;
    }
    
    @media (max-width: 550px) {
        margin-top: 6px;
        width: 100%;
    }
`
