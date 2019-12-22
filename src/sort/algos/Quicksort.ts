import { SortState } from "../sort";
import { colors } from "../../shared/colors";
import { NumberDisplayState } from "../numbers/numbers";
export function Quicksort(numbers: number[], low: number, high: number) {
    if (low < high) {
        const partitionIndex: number = Partition(numbers, low, high);
        Quicksort(numbers, low, partitionIndex - 1);
        Quicksort(numbers, partitionIndex + 1, high);
    }
}
export function IterativeQuicksort(numbers: number[]) {
    let stack: {
        low: number;
        high: number;
    }[] = [{ low: 0, high: numbers.length - 1 }];
    while (stack.length > 0) {
        const next = stack.pop();
        if (next.low < next.high) {
            const partitionIndex: number = Partition(numbers, next.low, next.high);
            stack.push({ low: next.low, high: partitionIndex - 1 });
            stack.push({ low: partitionIndex + 1, high: next.high });
        }
    }
}
export function setIntervalQuicksort(props: Partial<SortState>) {
    let stack: {
        low: number;
        high: number;
    }[] = [{ low: 0, high: props.numbers.length - 1 }];
    let partitionIndex: number = null;
    let next = stack.pop();
    let j = next.low;
    let pivot = props.numbers[next.high];
    let i = next.low - 1;
    let sort = () => {
        // TODO: Make this more readable and probably less convulated.
        let selectedColumns: NumberDisplayState[] = [];
        if (next === null && stack.length !== 0) {
            next = stack.pop();
            j = next.low;
            pivot = props.numbers[next.high];
            i = next.low - 1;
            selectedColumns.push();
        }
        else if (next !== null) {
            if (next.low < next.high) {
                // const partitionIndex: number = Partition(props.numbers, next.low, next.high);
                if (j <= next.high - 1) {
                    if (props.numbers[j] < pivot) {
                        i++;
                        const temp = props.numbers[i];
                        props.numbers[i] = props.numbers[j];
                        props.numbers[j] = temp;
                        selectedColumns.push({ color: colors[5].backgroundColor, number: next.high }, { color: colors[1].backgroundColor, number: next.low }, { color: colors[2].backgroundColor, number: i }, { color: colors[3].backgroundColor, number: j });
                        props.updateSortState({
                            numbers: props.numbers,
                            selectedColumns
                        });
                    }
                    j++;
                }
                else {
                    const temp = props.numbers[i + 1];
                    props.numbers[i + 1] = props.numbers[next.high];
                    props.numbers[next.high] = temp;
                    selectedColumns.push({ color: colors[5].backgroundColor, number: next.high }, { color: colors[3].backgroundColor, number: i + 1 }, { color: colors[8].backgroundColor, number: next.low });
                    props.updateSortState({
                        numbers: props.numbers,
                        selectedColumns
                    });
                    partitionIndex = i + 1;
                    stack.push({ low: next.low, high: partitionIndex - 1 });
                    stack.push({ low: partitionIndex + 1, high: next.high });
                    next = null;
                }
            }
            else {
                next = null;
            }
        }
        else {
            props.stopTimer();
            props.updateSortState({
                selectedColumns: []
            });
        }
    };
    props.updateSortState({
        timer: setInterval(sort, props.interval)
    });
}
function Partition(numbers: number[], low: number, high: number): number {
    const pivot = numbers[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (numbers[j] < pivot) {
            i++;
            const temp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }
    }
    const temp = numbers[i + 1];
    numbers[i + 1] = numbers[high];
    numbers[high] = temp;
    return (i + 1);
}
