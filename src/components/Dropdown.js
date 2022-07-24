import React from "react";

export const Dropdown = ({options, id, onSelectedValueChange, selectedValue}) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    <option value="">--Please choose an option--</option>
    {options.map(option => (
      <option key={option.value} value={option.value} selected={option.value === selectedValue}>{option.label}</option>
    ))}
  </select>);