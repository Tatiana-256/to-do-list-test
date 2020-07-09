import {CommentsStateType, TaskType} from './entitiesTypes'
import {v1} from 'uuid'

export const getInitialState = (tasks: Array<TaskType>, comments: CommentsStateType) => {
    return {
        tasks: tasks,
        comments: comments,
        selectedTaskId: null as string | null
    }
}

export const initialState = {
    tasks: [] as Array<TaskType>,
    comments: {} as CommentsStateType,
    selectedTaskId: null as string | null
}

export type AppStateType = typeof initialState

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addCommentAC>
    | ReturnType<typeof setSelectedTask>

export const stateReducer = (state: AppStateType, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'TODOLIST/STATE/REMOVE-TASK':
            const commentsCopy = {...state.comments}
            delete commentsCopy[action.id]

            return {
                ...state,
                selectedTaskId: state.selectedTaskId === action.id ? null : state.selectedTaskId,
                comments: commentsCopy,
                tasks: state.tasks.filter(t => t.id !== action.id)
            }
        case 'TODOLIST/STATE/ADD-TASK':
            const taskId = v1()
            return {
                ...state,
                comments: {...state.comments, [taskId]: []},
                tasks: [
                    ...state.tasks,
                    {id: taskId, title: action.title}
                ]
            }
        case 'TODOLIST/STATE/ADD-COMMENT':
            let comment = {commentId: v1(), text: action.text, background: action.color}
            let taskComments = state.comments[action.taskId]
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.taskId]: [...taskComments, comment]
                }
            }
        case 'TODOLIST/STATE/SET-SELECTED-TASK':
            return {
                ...state,
                selectedTaskId: action.taskId
            }
        default: {
            console.error(new Error('Action is not supported'))
            return state
        }
    }
}

export const removeTaskAC = (id: string) => ({type: 'TODOLIST/STATE/REMOVE-TASK', id} as const)
export const addTaskAC = (title: string) => ({type: 'TODOLIST/STATE/ADD-TASK', title} as const)
export const addCommentAC = (taskId: string, text: string, color: string) => ({
    type: 'TODOLIST/STATE/ADD-COMMENT',
    taskId,
    color,
    text
} as const)
export const setSelectedTask = (taskId: string) => ({
    type: 'TODOLIST/STATE/SET-SELECTED-TASK', taskId
} as const)
