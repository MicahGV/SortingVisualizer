import React, { Component } from 'react'
import pic from '../../assets/27d.jpg';
import { setIntervalQuicksortEasterEgg } from '../algos/easteregg';

export default class NumberCanvas extends Component<{}, { isLoaded: boolean, showCanvas: boolean }> {
    private img: React.RefObject<HTMLImageElement>
    private canvas: React.RefObject<HTMLCanvasElement>

    constructor(props) {
        super(props);

        this.state = { isLoaded: false, showCanvas: false }
        this.img = React.createRef();
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.img.current.onload = () => {
            setTimeout(() => this.EasterEgg(), 1000);
        }
    }

    private EasterEgg() {
        let ctx = this.canvas.current.getContext("2d");

        this.canvas.current.height = this.img.current.height;
        this.canvas.current.width = this.img.current.width;
        ctx.drawImage(this.img.current, 0, 0);
        let imageData = ctx.getImageData(0, 0, this.canvas.current.width, this.canvas.current.height);
        // Mark the positions
        let markedPixels = [];
        for (let i = imageData.data.length - 4; i >= 0; i -= 4) { // Fisher Yates Shuffle
            let curRed = imageData.data[i];
            let curBlue = imageData.data[i + 1];
            let curGreen = imageData.data[i + 2];
            let curAlpha = imageData.data[i + 3];
            markedPixels[i / 4] = [i / 4, [curRed, curBlue, curGreen, curAlpha]];
        }
        // Shuffle the positions a few times
        this.shuffle(markedPixels, imageData);
        this.setState({ isLoaded: true });

        setTimeout(() => {
            ctx.putImageData(imageData, 0, 0)
            setIntervalQuicksortEasterEgg(markedPixels, ctx, imageData);
        }, 1000);

    }

    private shuffle(markedPixels: any[], imageData: ImageData) {
        for (let k = 0; k < 3; k++) {
            for (let j = 0; j < markedPixels.length; j++) {
                let random = Math.floor(Math.random() * markedPixels.length);
                const pixel = markedPixels[j];
                const rando = markedPixels[random];
                markedPixels[j] = rando;
                markedPixels[random] = pixel;
                // Swap it in the buffer as well
                imageData.data[pixel[1] * 4] = rando[1][0];
                imageData.data[pixel[1] * 4 + 1] = rando[1][1];
                imageData.data[pixel[1] * 4 + 2] = rando[1][2];
                imageData.data[pixel[1] * 4 + 3] = rando[1][3];
                imageData.data[random * 4] = pixel[1][0];
                imageData.data[random * 4 + 1] = pixel[1][1];
                imageData.data[random * 4 + 2] = pixel[1][2];
                imageData.data[random * 4 + 3] = pixel[1][3];
            }
        }
    }

    render() {
        let height = 100;
        let width = 100;
        if (this.state.isLoaded) {
            height = this.canvas.current.height
            width = this.canvas.current.width
            setTimeout(() => this.setState({showCanvas: true}), 1050)
        }
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: "auto" }}
                className={`slide-in-right`}>
                <div style={{
                    display: `${this.state.showCanvas ? "none" : "initial"}`,
                    transition: ".8s ease-out all",
                    height: `${height}px`, width: `${width}px`, backgroundColor: "grey"
                }}
                className={`${!this.state.isLoaded ? "vibrate-1" : ""}`}
                ></div>
                <canvas
                    style={{ display: `${!this.state.showCanvas ? "none" : "initial"}` }}
                    height={400} width={400} ref={this.canvas} id="canvas"></canvas>
                <img ref={this.img} src={pic} style={{ display: "none" }} />
            </div>
        )
    }
}

