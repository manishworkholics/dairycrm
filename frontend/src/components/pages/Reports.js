import React, { useState } from 'react';

const Reports = () => {

  const [inputList, setInputList] = useState([
    { id: 1, value1: '', value2: '' },
  ]);

  // Add new input fields
  const handleAddInput = () => {
    const newId = inputList[inputList.length - 1].id + 1;
    setInputList([...inputList, { id: newId, value1: '', value2: '' }]);
  };

  // Remove input fields
  const handleRemoveInput = (id) => {
    const updatedList = inputList.filter((item) => item.id !== id);
    setInputList(updatedList);
  };

  // Handle input change for both fields
  const handleInputChange = (id, field, event) => {
    const newInputList = inputList.map((item) =>
      item.id === id ? { ...item, [field]: event.target.value } : item
    );
    setInputList(newInputList);
  };
console.log(inputList)
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12 mt-5'>
            <h1 className='text-center'>hello world</h1>
            <table>
              <thead>
                <tr>
                  <th>Field 1</th>
                  <th>Field 2</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inputList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={item.value1}
                        onChange={(e) => handleInputChange(item.id, 'value1', e)}
                        placeholder="Enter value 1"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.value2}
                        onChange={(e) => handleInputChange(item.id, 'value2', e)}
                        placeholder="Enter value 2"
                      />
                    </td>
                    <td>
                      {inputList.length > 1 && (
                        <button onClick={() => handleRemoveInput(item.id)}>Remove</button>
                      )}
                      {index === inputList.length - 1 && (
                        <button onClick={handleAddInput}>Add More</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports