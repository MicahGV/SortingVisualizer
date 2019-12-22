
export function getRandomNumbers(size: number, max: number): number[] {
    let numbers = [];
    for (let i = 0; i < size; i++) {
        const number = Math.floor(Math.random() * max);
        numbers.push(number);
    }

    return numbers;
}
