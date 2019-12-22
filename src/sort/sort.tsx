import React, { Component } from 'react'
import { getRandomNumbers } from '../util/get-random-numbers';
import { SortTypes, SortTypesArray } from './algos/sorts.model';
import Toolbar from '../shared/toolbar';
import "./sort.scss"
import Numbers, { NumberDisplayTypes, NumberDisplayState, NumberDisplayTypesArray } from './numbers/numbers';
import { HorizontalList } from '../forms/list';
import SortControlPanel from './sort-control-panel';

// TODO: BOGOSORT

export interface SortState {
    interval: number,
    timer: any,
    selectedColumns: NumberDisplayState[], //TODO: Make this independent from NumberDisplayState
    selectedNumberDisplay: NumberDisplayTypes,
    updateSortState: UpdateSortStateFunction,
    stopTimer(): void,
    numbers: number[],
    sortSize: number,
    maxNumberValue: number,
    selectedSort: number
}

export interface UpdateSortStateFunction {
    (props: Partial<SortState>)
}

export default class Sort extends Component<any, SortState, {}> {

    private easterEgg: string[] = []

    constructor(props) {
        super(props);
        this.state = {
            sortSize: 10,
            selectedSort: SortTypes.BubbleSort,
            selectedNumberDisplay: NumberDisplayTypes.Columns,
            interval: 100,
            timer: -1,
            selectedColumns: [],
            updateSortState: this.setSortFunctionState,
            stopTimer: this.stopTimer,
            maxNumberValue: 500,
            numbers: getRandomNumbers(10, 500), // 10 is the initial size 200 the max value
        };
    }

    componentDidMount() {
        window.addEventListener("keydown", (event) => {

            if (event.defaultPrevented) {
                return; // Should do nothing if the default action has been cancelled
            }

            if (event.key !== undefined) {
                this.easterEgg.unshift(event.key)
                if (this.easterEgg.length >= 5) {
                    this.easterEgg.pop();
                }

                if (this.easterEgg.join("") === "meme") {
                    this.setState({ selectedNumberDisplay: NumberDisplayTypes.EasterEgg });
                }
            }

        })
    }

    setSortFunctionState: UpdateSortStateFunction = (newSortFuncProps) => {
        this.setState({
            ...this.state,
            ...newSortFuncProps
        });
    }

    stopTimer = () => {
        clearInterval(this.state.timer);
    }

    startSort = () => {
        clearInterval(this.state.timer); // Clear anyway
        let selectedSort = SortTypesArray[this.state.selectedSort];
        selectedSort.func(this.state);
    }

    onSortMethodChange = (sortType: SortTypes) => {
        this.setState({
            selectedSort: sortType,
        })
        this.reset();
    }

    onNumberDisplayChange = (numberDisplayType: NumberDisplayTypes) => {
        this.setState({
            selectedNumberDisplay: numberDisplayType,
        })
    }

    onSortSizeChange = (value: number) => {
        this.setState({
            sortSize: value
        })
        // I apparently have to wait otherwise it won't render the new size
        setTimeout(this.reset, 50);
    }

    reset = () => {
        clearInterval(this.state.timer);
        this.setState({
            numbers: getRandomNumbers(this.state.sortSize, this.state.maxNumberValue),
            selectedColumns: []
        });
    }

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh"
            }}>
                <Toolbar>
                    <HorizontalList
                        Items={NumberDisplayTypesArray}
                        SelectedIdx={this.state.selectedNumberDisplay}
                        onUpdate={this.onNumberDisplayChange} />
                    <HorizontalList
                        Items={SortTypesArray}
                        SelectedIdx={this.state.selectedSort}
                        onUpdate={this.onSortMethodChange} />
                </Toolbar>
                <SortControlPanel {...this.state}
                    onSortSize={this.onSortSizeChange}
                    reset={this.reset}
                    startSort={this.startSort}
                    onSortMethodChange={this.onSortMethodChange}
                    onNumberDisplayChange={this.onNumberDisplayChange} />


                <Numbers
                    numbers={this.state.numbers}
                    selectedNumbers={this.state.selectedColumns}
                    numberDisplayType={this.state.selectedNumberDisplay}
                    maxValue={this.state.maxNumberValue}
                />
            </div >
        );
    }
}
