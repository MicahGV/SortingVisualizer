import React from 'react'
import { uuidv4 } from '../../util/uuid'
import { NumberDisplayState, NumbersProps } from './numbers';
import { colors } from '../../shared/colors';
import { useWindowSize } from '../../util/windows-resize';

export default function Columns(props: NumbersProps) {
    const [width, height] = useWindowSize();
    let numCols = props.numbers.map((number, idx) => {
        let selectedColumn = props.selectedNumbers.filter(ncs => ncs.number === idx);
        let color = colors[3].backgroundColor;
        if (selectedColumn.length > 0) {
            color = selectedColumn[0].color
        }
        let numberState: NumberDisplayState = {
            number: number,
            color: color,
            lengthOfNumbers: props.numbers.length,
            idx: idx,
            windowWidth: width,
            windowHeight: height,
            maxValue: props.maxValue
        };
        return NumberColumn(numberState);
    });
    return (
        <div style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: `${height}px`,
            width: "calc(100% - 10px)",
            margin: "10px 5px 0 5px"
        }}>
            {numCols}
        </div>)
}

function NumberColumn(props: NumberDisplayState) {
    let height = `${(props.number/props.maxValue * (props.windowHeight-100))}px`;
    let width = (window.innerWidth - 20) / props.lengthOfNumbers
    let number = width > 20 ? props.number : "";
    let widthPx = width + 'px';
    return (
        <div key={uuidv4()} style={{
            height: height,
            width: widthPx,
            fontSize: "10px",
            backgroundColor: props.color,
            color: "white",
            lineHeight: height,
            textAlign: 'center'
        }}>
            {number}
        </div>
    )
}
