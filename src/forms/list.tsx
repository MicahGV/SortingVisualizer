import React from 'react'
import './list.css'

export interface ListProps<T> {
    Items: T[],
    onUpdate(idx: number): void,
    SelectedIdx: number
}

export function DropdownList<T>(props: ListProps<T>) {
    return (
        <select value={props.SelectedIdx} onChange={(event) => props.onUpdate(parseInt(event.target.value))}>
            {props.Items.map((item: T, idx: number) => 
            <option key={item.toString() + idx} value={idx}>{item.toString()}</option>)}
        </select>
    );
}
export function VerticalList<T>(props: ListProps<T>) {
    let options = CreateOptions(props);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
        }}>
            {options}
        </div>
    );
}
export function HorizontalList<T>(props: ListProps<T>) {
    let options = CreateOptions(props);
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            {options}
        </div >
    );
}

function CreateOptions<T>(props: ListProps<T>) {
    let options = props.Items.map((item: T, idx: number) => {
        return (
            <div
                key={item.toString() + idx}
                onClick={(event) => props.onUpdate(idx)}
                className={`${props.SelectedIdx === idx ? 'selected' : ''}`}>
                <div>
                    {item.toString()}
                </div>
            </div>
        )
    });
    return options;
}
