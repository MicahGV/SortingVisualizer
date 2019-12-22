import { SortState } from "../sort";
import { colors } from "../../shared/colors";
import { NumberDisplayState } from "../numbers/numbers";
export function MergeSort(numbers: number[]) {
    let temp: number[] = [];
    // Group sizes by 1 2 4 8 ...
    for (let groupSize = 1; groupSize < numbers.length; groupSize *= 2) {
        for (let leftStart = 0; leftStart + groupSize < numbers.length; leftStart += groupSize * 2) {
            let rightStart = leftStart + groupSize; // rightStart is also LeftEnd
            let rightEnd = rightStart + groupSize;
            if (rightEnd > numbers.length) {
                rightEnd = numbers.length;
            }
            let tempCursor = leftStart;
            let leftIndex = leftStart;
            let rightIndex = rightStart;
            // Merge
            while (leftIndex < rightStart && rightIndex < rightEnd) {
                if (numbers[leftIndex] <= numbers[rightIndex]) {
                    temp[tempCursor++] = numbers[leftIndex++];
                }
                else {
                    temp[tempCursor++] = numbers[rightIndex++];
                }
            }
            while (leftIndex < rightStart) {
                temp[tempCursor++] = numbers[leftIndex++];
            }
            while (rightIndex < rightEnd) {
                temp[tempCursor++] = numbers[rightIndex++];
            }
            for (tempCursor = leftStart; tempCursor < rightEnd; tempCursor++) {
                numbers[tempCursor] = temp[tempCursor];
            }
        }
    }
}
// TODO: Break down the while loops to show the incremental changes. Because it will be
// cooler looking
export function setIntervalMergeSort(props: Partial<SortState>) {
    let temp: number[] = [];
    let groupSize = 1;
    let leftStart = 0;
    let sort = () => {
        if (groupSize >= props.numbers.length) {
            props.stopTimer();
            props.updateSortState({
                selectedColumns: []
            });
        }
        else {
            let selectedColumns: NumberDisplayState[] = [];
            let rightStart = leftStart + groupSize; // rightStart is also LeftEnd
            let rightEnd = rightStart + groupSize;
            if (rightEnd > props.numbers.length) {
                rightEnd = props.numbers.length;
            }
            let tempCursor = leftStart;
            let leftIndex = leftStart;
            let rightIndex = rightStart;
            while (leftIndex < rightStart && rightIndex < rightEnd) {
                if (props.numbers[leftIndex] <= props.numbers[rightIndex]) {
                    temp[tempCursor++] = props.numbers[leftIndex++];
                }
                else {
                    temp[tempCursor++] = props.numbers[rightIndex++];
                }
            }
            while (leftIndex < rightStart) {
                temp[tempCursor++] = props.numbers[leftIndex++];
            }
            while (rightIndex < rightEnd) {
                temp[tempCursor++] = props.numbers[rightIndex++];
            }
            for (tempCursor = leftStart; tempCursor < rightEnd; tempCursor++) {
                props.numbers[tempCursor] = temp[tempCursor];
                selectedColumns.push({ number: tempCursor, color: colors[5].backgroundColor });
                props.updateSortState({
                    numbers: props.numbers,
                    selectedColumns
                });
            }
            // handle loops
            if (leftStart + groupSize < props.numbers.length) {
                leftStart += groupSize * 2;
            }
            else {
                leftStart = 0;
                groupSize *= 2;
            }
        }
    };
    props.updateSortState({
        timer: setInterval(sort, props.interval)
    });
}
