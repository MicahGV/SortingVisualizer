import React from 'react';
import './App.css';
import { BubbleSort } from './algos/sorts';

const App: React.FC = () => {
  let arr = [4, 2, 6, 22, 7, 1];
  console.log(BubbleSort([4, 2, 6, 22, 7, 1]))
  console.log(BubbleSort(arr))
  let string = "";
  arr.forEach((val) => {
    string += val + " ";
  });
  return (
    <div>
      {string}
    </div>
  );
}

export default App;
