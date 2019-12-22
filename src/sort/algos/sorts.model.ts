import { SortState } from "../sort";
import { setIntervalHeapSort } from "./HeapSort";
import { setIntervalQuicksort } from "./Quicksort";
import { setIntervalMergeSort } from "./MergeSort";
import { setIntervalInsertionSort } from "./InsertionSort";
import { SetIntervalSelectionSort } from "./SelectionSort";
import { SetIntervalBubbleSort } from "./BubbleSort";

export class SortType {
    private name: string
    public func: (props: Partial<SortState>) => void
    constructor(name: string, func: (props: Partial<SortState>) => void) {
        this.name = name;
        this.func = func;
    }
    
    public toString = () => {
        return this.name;
    }
}
export enum SortTypes {
    BubbleSort = 0,
    SelectionSort = 1,
    MergeSort = 2,
    InsertionSort = 3,
    QuickSort = 4,
    HeapSor = 5
}
export const SortTypesArray: SortType[] = [
    new SortType("Bubble Sort", SetIntervalBubbleSort),
    new SortType("Insertion Sort", setIntervalInsertionSort),
    new SortType("Selection Sort", SetIntervalSelectionSort),
    new SortType("Merge Sort", setIntervalMergeSort),
    new SortType("Quick Sort", setIntervalQuicksort),
    new SortType("Heap Sort", setIntervalHeapSort)
]
