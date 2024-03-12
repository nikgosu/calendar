import styled from 'styled-components'

export const DateControllersButton = styled.button<{ $fontSize?: string, $color?: string, $active?: boolean }>`
    font-size: ${props => props.$fontSize || '1.65rem'};
    border: none;
    color: ${props => props.$color || '#969b9b'};
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: bold;
    padding: ${props => props.$color ? '4px 10px' : '1px 10px'};
    margin-left: 10px;
    cursor: pointer;
    background: ${props => props.$active ? '#cccaca' : '#eeeeee'};
    
    &:hover {
        background: #cccaca;
    }
    
`
