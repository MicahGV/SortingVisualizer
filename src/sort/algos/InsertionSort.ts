import { SortState } from "../sort";
import { colors } from "../../shared/colors";
import { NumberDisplayState } from "../numbers/numbers";
export function InsertionSort(numbers: number[]) {
    for (let i = 1; i < numbers.length; i++) {
        const num = numbers[i];
        let j = i - 1;
        while (j >= 0 && num < numbers[j]) {
            numbers[j + 1] = numbers[j];
            j--;
        }
        numbers[j + 1] = num;
    }
}
export function setIntervalInsertionSort(props: Partial<SortState>) {
    let i = 1;
    let j = i - 1;
    let num = props.numbers[i];
    let sort = () => {
        let selectedColumns: NumberDisplayState[] = [];
        if (i === props.numbers.length) {
            props.stopTimer();
            props.updateSortState({
                selectedColumns: []
            });
        }
        else {
            if (j >= 0 && num < props.numbers[j]) {
                props.numbers[j + 1] = props.numbers[j];
                selectedColumns.push({ color: colors[2].backgroundColor, number: j }, { color: colors[3].backgroundColor, number: j + 1 }, { color: colors[5].backgroundColor, number: i });
                props.updateSortState({
                    numbers: props.numbers,
                    selectedColumns
                });
                j--;
            }
            else {
                props.numbers[j + 1] = num;
                selectedColumns.push({ color: colors[3].backgroundColor, number: j + 1 }, { color: colors[5].backgroundColor, number: i });
                props.updateSortState({
                    numbers: props.numbers,
                    selectedColumns
                });
                i++;
                j = i - 1;
                num = props.numbers[i];
            }
        }
    };
    props.updateSortState({
        timer: setInterval(sort, props.interval)
    });
}
