import { SortState } from "../sort";
import { colors } from "../../shared/colors";
import { NumberDisplayState } from "../numbers/numbers";
export function SelectionSort(numbers: number[]) {
    for (let i = 0; i < numbers.length; i++) {
        let minIdx = i;
        for (let j = i; j < numbers.length; j++) {
            minIdx = numbers[minIdx] > numbers[j] ? j : minIdx;
        }
        let temp = numbers[i];
        numbers[i] = numbers[minIdx];
        numbers[minIdx] = temp;
    }
}
export function SetIntervalSelectionSort(props: Partial<SortState>) {
    let i = 0;
    let j = 0;
    let minIdx = i;
    let sort = () => {
        if (i === props.numbers.length - 1) {
            props.stopTimer();
            props.updateSortState({
                selectedColumns: []
            });
        }
        else {
            let selectedColumns: NumberDisplayState[] = [];
            if (j === props.numbers.length) { // reset j loop and swap max with i's position
                let temp = props.numbers[i];
                props.numbers[i] = props.numbers[minIdx];
                props.numbers[minIdx] = temp;
                i++;
                minIdx = i;
                j = i;
                // I kind of hate this as I have to force React to update something it already has. There probably is a better way
                props.updateSortState({ numbers: props.numbers });
                selectedColumns.push({ number: minIdx, color: colors[5].backgroundColor });
            }
            else { // Find max
                minIdx = props.numbers[minIdx] > props.numbers[j] ? j : minIdx;
                selectedColumns.push({ number: j, color: colors[1].backgroundColor }, { number: i, color: colors[7].backgroundColor }, { number: minIdx, color: colors[5].backgroundColor });
                j++;
            }
            props.updateSortState({
                selectedColumns
            });
        }
    };
    props.updateSortState({
        timer: setInterval(sort, props.interval)
    });
}
