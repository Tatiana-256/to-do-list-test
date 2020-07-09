import React, {useCallback} from 'react'
import {AddItemForm} from '../common/AddItemForm'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import styles from './toDoList.module.css'
import {CommentsStateType, TaskType} from '../state/entitiesTypes'

type PropsType = {
    comments: CommentsStateType,
    tasks: Array<TaskType>
    selectedTaskId: string | null
    removeTask: (taskId: string) => void
    showCommentsOfTask: (taskId: string) => void
    addTask: (title: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title)
    }, [props.addTask]);

    return <div>
        <AddItemForm addItem={addTask} placeholder={'Type task here'}/>
        <div className={styles.task}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const showComments = () => {
                        props.showCommentsOfTask(t.id)
                    }

                    let commentsForTask = props.comments[t.id]
                    return <div className={styles.inputStyle}>
                        <span>{t.title}</span>
                        {
                            commentsForTask ?
                                <span className={styles.numberOfCom}>{commentsForTask.length}</span> :
                                <span className={styles.numberOfCom}>0</span>
                        }
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                        {
                            <Button variant={t.id === props.selectedTaskId ? 'contained' : 'outlined'}
                                    color={'primary'}
                                    href="#outlined-buttons" onClick={showComments}>
                                Show Comments
                            </Button>

                        }
                    </div>
                })
            }
        </div>
    </div>
})


