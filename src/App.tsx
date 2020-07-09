import React, {useCallback, useEffect, useReducer, useState} from 'react'
import './App.css'
import {Todolist} from './components/Todolist'
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core'
import {Comments} from './components/Comments'
import {
    addCommentAC,
    addTaskAC,
    getInitialState,
    removeTaskAC,
    setSelectedTask,
    stateReducer
} from './state/stateReducer'
import {repository} from './repository/repository'
import {CommentsStateType, TaskType} from './state/entitiesTypes'

type AppPropsType = {
    comments: CommentsStateType,
    tasks: Array<TaskType>
}


let columnPaperStyle = {padding: '10px', width: '450px'}

export function RestoreAppContainer() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [comments, setComments] = useState<CommentsStateType>({});

    useEffect(() => {
        Promise.all([
            repository.getTasks(),
            repository.getComments()
        ])
            .then(([tasks, comments]) => {
                setTasks(tasks)
                setComments(comments)
                setIsInitialized(true);
            });
    }, [])

    return isInitialized ? <App comments={comments} tasks={tasks}/> : <span>Loading...</span>
}


function App(props: AppPropsType) {
    const [state, dispatch] = useReducer(stateReducer, getInitialState(props.tasks, props.comments))
    const {comments, tasks, selectedTaskId} = state;
    const selectedComments = selectedTaskId ? comments[selectedTaskId] : []

    useEffect(() => {
        repository.saveTasks(state.tasks);
        repository.saveComments(comments);
    }, [tasks, comments])

    const removeTask = useCallback((id: string) => dispatch(removeTaskAC(id)), []);
    const addTask = useCallback((title: string) => dispatch(addTaskAC(title)), []);
    const addComment = useCallback((taskId: string,
                                    commentText: string,
                                    color: string = '#000') => dispatch(addCommentAC(taskId, commentText, color)), []);

    const showCommentsOfTask = useCallback((id: string) => dispatch(setSelectedTask(id)), []);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        To do list
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className='container'>
                <Container maxWidth="lg">
                    <Grid item>
                        <Paper style={columnPaperStyle}>
                            <h3>Tasks</h3>
                            <Todolist
                                comments={comments}
                                selectedTaskId={selectedTaskId}
                                tasks={tasks}
                                removeTask={removeTask}
                                addTask={addTask}
                                showCommentsOfTask={showCommentsOfTask}
                            />
                        </Paper>
                    </Grid>
                </Container>
                <Container maxWidth="lg">
                    <Grid item>
                        <Paper style={columnPaperStyle}>
                            <h3>Comments for tasks</h3>
                            {
                                state.selectedTaskId && <div>
                                    <div>Comments {selectedTaskId}</div>
                                    <Comments taskId={selectedTaskId}
                                              comments={selectedComments}
                                              addComment={addComment}/>
                                </div>
                            }
                        </Paper>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}
