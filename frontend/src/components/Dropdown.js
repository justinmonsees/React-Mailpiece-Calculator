import React from 'react';
import Form from 'react-bootstrap/Form';

const Dropdown = ({ paperTypes }) => {
  return (
    <Form.Select aria-label="Default select example">
      <option>Select Paper Type</option>
      {paperTypes.map(paperType => {
        return (
          <option value={paperType.id} key={paperType.id}>
            {paperType.name}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default Dropdown;
