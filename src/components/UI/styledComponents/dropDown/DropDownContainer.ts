import styled from 'styled-components'

export const DropDownContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    position: relative;
    &:before {
        content: '›';
        top: 50%;
        right: 10%;
        position: absolute;
        z-index: 2;
        font-size: 1.65rem;
        font-weight: bold;
        color: #969b9b;
        transform: translateY(-50%) rotate(90deg);
        pointer-events: none;
    }
    &:hover {
        cursor: pointer;
        background: #cccaca;
    }
`;
