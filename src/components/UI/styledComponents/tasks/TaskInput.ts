import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize';
export const TaskInput = styled(TextareaAutosize)`
    position: relative;
    z-index: 4;
    width: -webkit-fill-available;
    background: ${({theme}) => theme.colors.inputBackground};
    border: none;
    border-radius: ${({theme}) => theme.borders.dayItemRadius};
    outline: none;
    color: ${({theme}) => theme.colors.inputColor};
    padding: ${({theme}) => theme.offsets.dayItemPadding};
    resize: none;
    margin-bottom: ${({theme}) => theme.offsets.dayItemMB};
`
