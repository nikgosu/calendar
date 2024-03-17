import styled from 'styled-components'

export const DropDownList = styled.ul`
    padding: 0;
    margin: 0;
    padding-left: 1em;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    color:  ${({theme}) => theme.colors.primary};
    font-size:  ${({theme}) => theme.text.secondary};
    font-weight: ${({theme}) => theme.weight.semiBold};

    &:first-child {
        padding-top: 0.6em;
    }
`;
