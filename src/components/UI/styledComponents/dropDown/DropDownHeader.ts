import styled from 'styled-components'

export const DropDownHeader = styled.div`
    padding: 7px 35px 7px 17.5px;
    box-sizing: border-box;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: ${({theme}) => theme.weight.semiBold};
    font-size:  ${({theme}) => theme.text.secondary};
    color:  ${({theme}) => theme.colors.primary};
`;
