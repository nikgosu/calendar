import styled from 'styled-components'

export const TaskItem = styled.div`
    padding: ${({theme}) => theme.offsets.dayItemPadding};
    font-size: ${({theme}) => theme.text.dayItem};
    background: ${({theme}) => theme.colors.taskItemBackground};
    border-radius: ${({theme}) => theme.borders.dayItemRadius};
    margin-bottom: ${({theme}) => theme.offsets.dayItemMB};
    color: ${({theme}) => theme.colors.dayItemColor};
    font-weight: ${({theme}) => theme.weight.semiBold};
    word-wrap: break-word;
    position: relative;
`
