import React, {useState} from 'react';
// import {scaleTime, scaleLinear, extent, timeFormat} from 'd3';

import {Dropdown} from "./components/Dropdown";
import './App.css'

const width = 960;
const height = 500;

const options = [
  {value: 'dog', label: 'Dog'},
  {value: 'cat', label: 'Cat'},
  {value: 'hamster', label: 'Hamster'},
  {value: 'parrot', label: 'Parrot'},
  {value: 'spider', label: 'Spider'},
  {value: 'goldfish', label: 'Goldfish'}
];


const App = () => {
  const [selectedValue, setSelectedValue] = useState('hamster');
  console.log(selectedValue)
  // const data = useData();

  // if (!data) {
  //   return <pre>Loading...</pre>;
  // }

  return (
    <div>
      <label htmlFor="pet-select">Choose a pet</label>
      <Dropdown
        options={options}
        id={"pet-select"}
        onSelectedValueChange={setSelectedValue}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default App;
