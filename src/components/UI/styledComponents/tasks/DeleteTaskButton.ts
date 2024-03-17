import styled from 'styled-components'

export const DeleteTaskButton = styled.span`
    position: absolute;
    top: 0;
    right: 10px;
    transform: translateY(-50%) translateX(35%) rotate(45deg);
    color: red;
    font-size: ${({theme}) => theme.text.standard};
    user-select: none;
    cursor: pointer;
    z-index: 2;
`
