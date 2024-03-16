import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize';
export const TaskInput = styled(TextareaAutosize)`
    position: relative;
    z-index: 4;
    width: -webkit-fill-available;
    background: #d7d7d7;
    border: none;
    border-radius: 4px;
    outline: none;
    color: #4b4b4b;
    padding: 2px 4px;
    resize: none;
    margin-bottom: 4px;
`
