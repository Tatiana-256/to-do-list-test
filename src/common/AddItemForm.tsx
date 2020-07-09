import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import {PhotoshopPicker} from "react-color";
import styles from './AddItemForm.module.css'

type AddItemFormPropsType = {
    addItem: (title: string, color?: string) => void
    placeholder: string,
    background?: string
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    let [flag, setFlag] = useState(false);
    let [color, setColor] = useState<string>('#000');


    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title, color);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.charCode === 13 && e.ctrlKey) {
            addItem();
        }
    }

    const colorChangeHandler = (color: any) => {
        setColor(color.hex)

    }


    const flagHandler = () => {
        setFlag(!flag)
    }

    return <div>
        <div className={styles.inputStyle}>
            {props.background ?
                <div
                    onClick={flagHandler}
                    style={{backgroundColor: color, height: '30px', width: '30px', content: ''}}/> : null}

            {flag ?
                < PhotoshopPicker onAccept={flagHandler} onCancel={flagHandler} onChangeComplete={colorChangeHandler}
                                  color={color}/> : null}
            <TextField
                style ={{width: '350px'}}
                variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={props.placeholder}
                       helperText={error}
            />

            <IconButton color="primary" onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    </div>
})
