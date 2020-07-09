import React, {useCallback, useState} from 'react'
import {AddItemForm} from '../common/AddItemForm'
import styles from './toDoList.module.css'
import {TaskType} from '../state/entitiesTypes'


export type CommentType = {
    commentId: string,
    text: string,
    background: string
}

type PropsType = {
    comments: Array<CommentType>
    taskId: string | null
    addComment: (taskId: string, commentText: string, color?: string) => void
}

export const Comments = React.memo(function (props: PropsType) {
    let [flag, setFlag] = useState(false);

    const addComment = useCallback((title: string, color?: string) => {
        if (props.taskId !== null) {
            props.addComment(props.taskId, title, color)
        }
    }, [props.taskId, props.addComment]);

    const flagHandler = useCallback(() => {
        setFlag(!flag)
    }, [flag])

    return <div>

        {props.comments ?
            props.comments.map(comment => {
                    return <div style={{padding: '10px'}} key={comment.commentId}>
                        <div className={styles.comment}>
                            <div
                                onClick={flagHandler}
                                style={{backgroundColor: comment.background, height: '20px', width: '20px', content: ''}}/>
                            <div>{comment.text}</div>
                        </div>
                    </div>
                }
            ) : null
        }
        <AddItemForm addItem={addComment} placeholder={'Type comment here'} background={'#000'}/>
    </div>
})
