import {CommentsStateType, TaskType} from '../state/entitiesTypes'

export const repository = {
    _keys: {
        tasks: 'todolist-tasks',
        comments: 'comments-tasks'
    },
    async saveTasks(tasks: Array<TaskType>) {
        localStorage.setItem(this._keys.tasks, JSON.stringify(tasks))
    },
    async saveComments(comments: CommentsStateType) {
        localStorage.setItem(this._keys.comments, JSON.stringify(comments))
    },
    async getComments(): Promise<CommentsStateType> {
        const data = localStorage.getItem(this._keys.comments)
        if (data) {
            return JSON.parse(data)
        } else {
            return {}
        }
    },
    async getTasks(): Promise<Array<TaskType>> {
        const data = localStorage.getItem(this._keys.tasks)
        if (data) {
            return JSON.parse(data)
        } else {
            return []
        }
    }
}
