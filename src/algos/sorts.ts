async function BubbleSort(numbers: number[]) { // Sort Ascending
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

function SelectionSort(numbers: number[]) {
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
var step = 0;
function MergeSort(numbers: number[], layer: number) {
    if (numbers.length > 1) {
        step++;

        let m = Math.ceil(numbers.length / 2);
        let leftArr = numbers.slice(0, m);
        let rightArr = numbers.slice(m, numbers.length);
        MergeSort(leftArr, layer + 1);
        MergeSort(rightArr, layer + 1);

        let i = 0, j = 0, k = 0;
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] < rightArr[j]) {
                numbers[k] = leftArr[i];
                i++;
            } else {
                numbers[k] = rightArr[j];
                j++;
            }
            k++;
        }

        while(i < leftArr.length) {
            numbers[k] = leftArr[i];
            i++;
            k++;
        }

        while(j < rightArr.length) {
            numbers[k]=rightArr[j];
            j++;
            k++;
        }
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export { BubbleSort, SelectionSort, MergeSort };