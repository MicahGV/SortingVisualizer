import { HeapSort, IterativeHeapSort } from "./HeapSort";
import { Quicksort, IterativeQuicksort } from "./Quicksort";
import { MergeSort } from "./MergeSort";
import { InsertionSort } from "./InsertionSort";
import { SelectionSort } from "./SelectionSort";
import { BubbleSort } from "./BubbleSort";

test("Bubble sort works", () => {
    // Arrange
    let unsorted = [5, 8, 12, 6, 0];
    let sorted = [0, 5, 6, 8, 12];
    // Act
    BubbleSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    expect(equals).toBeTruthy();;
});

test("Selection sort works", () => {
    // Arrange
    let unsorted = [5, 8, 12, 6, 0];
    let sorted = [0, 5, 6, 8, 12];
    // Act
    SelectionSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    expect(equals).toBeTruthy();
});

test("Merge sort works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    MergeSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    expect(equals).toBeTruthy();
});

test("Quicksort works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    Quicksort(unsorted, 0, unsorted.length - 1);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    expect(equals).toBeTruthy();
})

test("Iterative Quicksort works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    IterativeQuicksort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    expect(equals).toBeTruthy();
})


test("Insertion Sort Works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    InsertionSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    console.log(unsorted)
    expect(equals).toBeTruthy();
})

test("Heap Sort Works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    HeapSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    console.log(unsorted)
    expect(equals).toBeTruthy();
})

test("IterativeHeapSort Sort Works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    IterativeHeapSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val === sorted[idx]);
    console.log(unsorted)
    expect(equals).toBeTruthy();
})

