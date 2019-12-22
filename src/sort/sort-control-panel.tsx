import React, { useState } from 'react'
import { SortState } from './sort'
import { NumberDisplayTypesArray, NumberDisplayTypes } from './numbers/numbers'
import { DropdownList } from '../forms/list';
import { SortTypesArray, SortTypes } from './algos/sorts.model';

// TODO: Refine this more

const panelItemStyle: React.CSSProperties = {
    display: 'flex',
    margin: "4px 0px",
    justifyContent: "space-between"
}

export interface SortControlPanelProps extends Partial<SortState> {
    onSortSize(value: number): void,
    reset(): void,
    startSort(): void,
    onSortMethodChange(sortType: SortTypes): void,
    onNumberDisplayChange(numberDisplayType: NumberDisplayTypes): void,
}
export default function SortControlPanel(props: SortControlPanelProps) {
    const [state, setState] = useState({ mouseIsOver: false });
    let onMouseEnter = () => setState({ mouseIsOver: true });
    let onMouseLeave = () => setState({ mouseIsOver: false });
    return (
        <div
            style={{ opacity: `${!state.mouseIsOver ? .9 : 1}` }}
            onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="sortOptions">
            <div style={{ display: 'flex' }}>
                <label>Timing Interval: </label>
                <input
                    type="range"
                    min="0" max="1000"
                    value={props.interval}
                    onChange={(event) => props.updateSortState({
                        interval: parseInt(event.target.value)
                    })}
                    step="50" />
                <span style={{ width: '50px' }}>
                    {props.interval}ms
                </span>
            </div>

            <div style={panelItemStyle}>
                <label>Display Type:</label>
                <DropdownList
                    Items={NumberDisplayTypesArray}
                    SelectedIdx={props.selectedNumberDisplay}
                    onUpdate={props.onNumberDisplayChange} />
            </div>
            <div style={panelItemStyle}>
                <label>Sort Method:</label>
                <DropdownList
                    Items={SortTypesArray}
                    SelectedIdx={props.selectedSort}
                    onUpdate={props.onSortMethodChange} />
            </div>
            <div style={panelItemStyle}>
                <label>Number of {NumberDisplayTypesArray[props.selectedNumberDisplay]}: </label>
                <input type="number"
                    onChange={(event) => props.onSortSize(parseInt(event.target.value))}
                    value={props.sortSize}
                    min="1" max="200"
                    list="tickmarks"
                />
            </div>

            <div style={{ float: 'right' }}>
                <button onClick={props.reset}>Reset</button>
                <button onClick={props.startSort}> Sort</button>
            </div>
        </div>
    )
}
