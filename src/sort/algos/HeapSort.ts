import { SortState } from "../sort";
import { colors } from "../../shared/colors";
import { NumberDisplayState } from "../numbers/numbers";
export function HeapSort(numbers: number[]) {
    // Build max heap
    for (let i = Math.floor(numbers.length / 2) - 1; i >= 0; i--) {
        heapify(numbers, numbers.length, i);
    }
    for (let i = numbers.length - 1; i >= 0; i--) {
        let temp = numbers[0];
        numbers[0] = numbers[i];
        numbers[i] = temp;
        heapify(numbers, i, 0);
    }
}
export function IterativeHeapSort(numbers: number[]) {
    for (let i = Math.floor(numbers.length / 2) - 1; i >= 0; i--) {
        iterativeHeapify(numbers, numbers.length, i);
    }
    for (let i = numbers.length - 1; i >= 0; i--) {
        let temp = numbers[0];
        numbers[0] = numbers[i];
        numbers[i] = temp;
        iterativeHeapify(numbers, i, 0);
    }
}
export function setIntervalHeapSort(props: Partial<SortState>) {
    // First heapify
    let i = Math.floor(props.numbers.length / 2);
    let stack: [{
        size: number;
        nextI: number;
    }] = [{ size: props.numbers.length, nextI: i }];
    let j = props.numbers.length;
    let sort = () => {
        let selectedColumns: NumberDisplayState[] = [];
        if (i >= 0) { // For loop
            if (stack.length) {
                let next = stack.pop();
                let size = next.size;
                let i = next.nextI;
                let largest = i;
                let l = 2 * i + 1;
                let r = 2 * i + 2;
                if (l < size && props.numbers[l] > props.numbers[largest]) {
                    largest = l;
                }
                if (r < size && props.numbers[r] > props.numbers[largest]) {
                    largest = r;
                }
                if (largest !== i) {
                    let temp = props.numbers[i];
                    props.numbers[i] = props.numbers[largest];
                    props.numbers[largest] = temp;
                    props.updateSortState({
                        numbers: props.numbers,
                    });
                    selectedColumns.push({ number: i, color: colors[2].backgroundColor }, { number: largest, color: colors[5].backgroundColor });
                    stack.push({ size: size, nextI: largest });
                }
            }
            else {
                i--;
                if (i >= 0) {
                    stack.push({ size: props.numbers.length, nextI: i });
                }
            }
        }
        else if (i < 0 && j >= 0) {
            if (stack.length) {
                let next = stack.pop();
                let size = next.size;
                let i = next.nextI;
                let largest = i;
                let l = 2 * i + 1;
                let r = 2 * i + 2;
                if (l < size && props.numbers[l] > props.numbers[largest]) {
                    largest = l;
                }
                if (r < size && props.numbers[r] > props.numbers[largest]) {
                    largest = r;
                }
                if (largest !== i) {
                    let temp = props.numbers[i];
                    props.numbers[i] = props.numbers[largest];
                    props.numbers[largest] = temp;
                    props.updateSortState({
                        numbers: props.numbers
                    });
                    selectedColumns.push({ number: i, color: colors[2].backgroundColor }, { number: largest, color: colors[5].backgroundColor });
                    stack.push({ size: size, nextI: largest });
                }
            }
            else {
                j--;
                if (j >= 0) {
                    let temp = props.numbers[0];
                    props.numbers[0] = props.numbers[j];
                    props.numbers[j] = temp;
                    props.updateSortState({
                        numbers: props.numbers,
                        selectedColumns: [{ number: j, color: colors[2].backgroundColor }, { number: 0, color: colors[5].backgroundColor }]
                    });
                    stack.push({ size: j, nextI: 0 });
                }
            }
        }
        else {
            props.stopTimer();
        }
        props.updateSortState({
            selectedColumns: selectedColumns
        });
    };
    props.updateSortState({
        timer: setInterval(sort, props.interval)
    });
}
function heapify(numbers: number[], size: number, i: number) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    if (l < size && numbers[l] > numbers[largest]) {
        largest = l;
    }
    if (r < size && numbers[r] > numbers[largest]) {
        largest = r;
    }
    if (largest !== i) {
        let temp = numbers[i];
        numbers[i] = numbers[largest];
        numbers[largest] = temp;
        heapify(numbers, size, largest);
    }
}
function iterativeHeapify(numbers: number[], initialSize: number, intialI: number) {
    let stack: [[number, number]] = [[initialSize, intialI]];
    while (stack.length) {
        let pop = stack.pop();
        let size = pop[0];
        let i = pop[1];
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < size && numbers[l] > numbers[largest]) {
            largest = l;
        }
        if (r < size && numbers[r] > numbers[largest]) {
            largest = r;
        }
        if (largest !== i) {
            let temp = numbers[i];
            numbers[i] = numbers[largest];
            numbers[largest] = temp;
            stack.push([size, largest]);
        }
    }
}
