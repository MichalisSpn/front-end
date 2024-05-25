import { Button } from '@mui/material';
import React from 'react';

const InputRepair = ({labelId, labelValue, type, inputId, inputValue, onChange }) => {
  return (
    <div className="mb-4">
      <label id={labelId} className="block text-gray-700 mb-2">
        {labelValue}
      </label>
      <input
        type={type}
        id={inputId}
        value={inputValue}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <h1 repair  />
    </div>
  );
};

export default InputRepair;