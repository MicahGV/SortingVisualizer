import React from 'react'
import { Color } from 'csstype'
import NumberCanvas from './number-canvas';
import Columns from './number-column';
import Points from './number-point';

export enum NumberDisplayTypes {
    Columns = 0,
    Points = 1,
    EasterEgg = 2
}

export const NumberDisplayTypesArray = ["Columns", "Points"]

export interface NumbersProps {
    numberDisplayType: NumberDisplayTypes,
    numbers: number[],
    selectedNumbers: NumberDisplayState[],
    maxValue: number
}

export interface NumberDisplayState {
    number: number,
    color: Color,
    lengthOfNumbers?: number,
    idx?: number,
    windowWidth?: number,
    windowHeight?: number,
    maxValue?: number
}

export default function Numbers(props: NumbersProps) {
    let numbers: JSX.Element;
    switch (props.numberDisplayType) {
        case NumberDisplayTypes.Columns:
            numbers = Columns(props);
            break;
        case NumberDisplayTypes.Points:
            numbers = Points(props);
            break;
        case NumberDisplayTypes.EasterEgg:
            numbers = <NumberCanvas />
            break;
        default:
            throw Error("Numbers Display Type is Required");
    }
    return numbers;
}


