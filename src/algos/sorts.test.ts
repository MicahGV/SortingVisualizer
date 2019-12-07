import { BubbleSort, SelectionSort, MergeSort } from "./sorts";

it("Bubble sort works", () => {
    // Arrange
    let unsorted = [5, 8, 12, 6, 0];
    let sorted = [0, 5, 6, 8, 12];
    // Act
    BubbleSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val == sorted[idx]);
    expect(equals)
});

it("Selection sort works", () => {
    // Arrange
    let unsorted = [5, 8, 12, 6, 0];
    let sorted = [0, 5, 6, 8, 12];
    // Act
    SelectionSort(unsorted);
    // Assert
    let equals = unsorted.every((val, idx) => val == sorted[idx]);
    expect(equals)
});

it("Merge sort works", () => {
    // Arrange
    let unsorted = [38, 27, 43, 3, 9, 82, 10];
    let sorted = [3, 9, 10, 27, 38, 43, 82];
    // Act
    MergeSort(unsorted, 0);
    // Assert
    let equals = unsorted.every((val, idx) => val == sorted[idx]);
    expect(equals)
});

