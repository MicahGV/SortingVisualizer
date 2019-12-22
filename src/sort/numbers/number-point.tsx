import React from 'react'
import { uuidv4 } from '../../util/uuid'
import { NumberDisplayState, NumbersProps } from './numbers'
import { useWindowSize } from '../../util/windows-resize';
import { colors } from '../../shared/colors';

export default function Points(props: NumbersProps) {
    const [width, height] = useWindowSize();
    let numPoints = props.numbers.map((number, idx) => {
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
        return NumberPoint(numberState);
    });

    return (
        <div style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: `${height}px`,
            width: "calc(100% - 10px)",
            margin: "10px 5px 0 5px",
        }}>
            {numPoints}
        </div>)
}


function NumberPoint(props: NumberDisplayState) {
    return (
        <div key={uuidv4()} style={{
            top: `${(props.number/props.maxValue * (props.windowHeight-100))}px`,
            left: `${(props.windowWidth - 10) * props.idx / props.lengthOfNumbers}px`,
            position: "absolute",
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            backgroundColor: props.color,
            color: "white",
        }} />
    )
}
