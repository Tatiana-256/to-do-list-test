import {CommentType} from '../components/TaskComments'

export type TaskType = {
    id: string
    title: string
}
export type CommentsStateType = {
    [key: string]: Array<CommentType>
}
