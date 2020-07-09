import {CommentType} from '../components/Comments'

export type TaskType = {
    id: string
    title: string
    isDone: boolean,
}
export type CommentsStateType = {
    [key: string]: Array<CommentType>
}
