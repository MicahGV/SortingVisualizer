export function setIntervalQuicksortEasterEgg(numbers: [number, number[]][], ctx, buffer) {
    let stack: { low: number, high: number }[] = [{ low: 0, high: numbers.length - 1 }];
    let partitionIndex: number = null;
    let next = stack.pop();
    let timer;
    let j = next.low;
    let pivot = numbers[next.high][0];
    let i = next.low - 1;

    let sort = () => {
        for (let k = 0; k < 1000; k++) {
            if (next === null && stack.length !== 0) {
                next = stack.pop();
                j = next.low;
                pivot = numbers[next.high][0];
                i = next.low - 1;
            } else if (next !== null) {
                if (next.low < next.high) {
                    // const partitionIndex: number = Partition(numbers, next.low, next.high);
                    if (j <= next.high - 1) {
                        if (numbers[j][0] < pivot) {
                            i++;
                            const temp = numbers[i];
                            numbers[i] = numbers[j];
                            numbers[j] = temp;
                            updateBuffer(numbers[i], buffer)
                            updateBuffer(numbers[j], buffer)
                            ctx.putImageData(buffer, 0, 0);
                        }
                        j++;
                    } else {
                        const temp = numbers[i + 1];
                        numbers[i + 1] = numbers[next.high];
                        numbers[next.high] = temp;
                        updateBuffer(numbers[i + 1], buffer)
                        updateBuffer(numbers[next.high], buffer)
                        ctx.putImageData(buffer, 0, 0);

                        partitionIndex = i + 1;
                        stack.push({ low: next.low, high: partitionIndex - 1 })
                        stack.push({ low: partitionIndex + 1, high: next.high })

                        next = null;
                    }
                } else {
                    next = null;
                }
            } else {
                clearInterval(timer);
            }
        }
    }
    timer = setInterval(sort, 0)
}


function setIntervalCountingSort(markedPixels: any[], imageData: ImageData, ctx: CanvasRenderingContext2D) {
    let i = 0;
    let start = 0;
    let end = 0;
    let intervals = 100;
    let timer = setInterval(() => {
        if (i > intervals - 1) {
            clearInterval(timer);
        }
        start = Math.floor(markedPixels.length / intervals * i);
        end = Math.floor(markedPixels.length / intervals * i + markedPixels.length / intervals);
        end = Math.min(end, markedPixels.length);
        for (let j = start; j < end; j++) {
            const pixel = markedPixels[j];
            const pixPos = pixel[0];
            imageData.data[pixPos * 4] = pixel[1][0];
            imageData.data[pixPos * 4 + 1] = pixel[1][1];
            imageData.data[pixPos * 4 + 2] = pixel[1][2];
            imageData.data[pixPos * 4 + 3] = pixel[1][3];
        }
        i++;
        ctx.putImageData(imageData, 0, 0);
    }, 50);
}

function updateBuffer(pixel, buffer) {
    const pixPos = pixel[0];
    buffer.data[pixPos * 4] = pixel[1][0];
    buffer.data[pixPos * 4 + 1] = pixel[1][1];
    buffer.data[pixPos * 4 + 2] = pixel[1][2];
    buffer.data[pixPos * 4 + 3] = pixel[1][3];
}