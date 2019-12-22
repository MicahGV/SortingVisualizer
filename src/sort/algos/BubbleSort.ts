import { SortState } from "../sort";
import { colors } from "../../shared/colors";
import { NumberDisplayState } from "../numbers/numbers";
export function BubbleSort(numbers: number[]) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) { // -i because the right side should be sorted so don't have to touch it
            if (numbers[j] > numbers[j + 1]) {
                let left = numbers[j];
                let right = numbers[j + 1];
                numbers[j] = right;
                numbers[j + 1] = left;
            }
        }
    }
}
export function SetIntervalBubbleSort(props: Partial<SortState>) {
    let i = 0;
    let j = 0;
    let end = props.numbers.length - i - 1;
    let sort = () => {
        let selectedColumns: NumberDisplayState[] = []; // Needs to be outside of everything so I add additional columnsand reset each time sort is called
        if (i === props.numbers.length - 1) {
            props.stopTimer();
            props.updateSortState({
                selectedColumns: []
            });
        }
        else {
            if (props.numbers[j] > props.numbers[j + 1]) {
                let left = props.numbers[j];
                let right = props.numbers[j + 1];
                props.numbers[j] = right;
                props.numbers[j + 1] = left;
                // I kind of hate this as I have to force React to update something it already has. There probably is a better way
                props.updateSortState({ numbers: props.numbers });
                selectedColumns.push({ number: j, color: colors[4].backgroundColor }, { number: j + 1, color: colors[3].backgroundColor });
            }
            if (j === end) {
                i++;
                j = 0;
            }
            else {
                selectedColumns.push({ number: j, color: colors[3].backgroundColor });
                j++;
            }
            props.updateSortState({
                selectedColumns
            });
        }
    };
    props.updateSortState({
        timer: setInterval(sort, props.interval) // Pass back so I can clear it from sort.tsx
    });
}
