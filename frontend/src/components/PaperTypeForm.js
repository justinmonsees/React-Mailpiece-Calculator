import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PaperTypeForm = () => {
  const [paperTypeName, setPaperTypeName] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newPaperType = JSON.stringify({
      name: paperTypeName,
      basis_width: 26,
      basis_height: 20
    });

    try {
      await fetch('http://localhost:3000/paperTypes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: newPaperType
      });
    } catch (e) {
      alert(e);
    }

    // console.log(newPaperType);
    // props.onPaperTypeSave(newPaperType);

    setPaperTypeName(''); //clear the paper type name input field
  };

  return (
    <Form
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Paper Type Name:</Form.Label>
        <Form.Control
          type="id"
          placeholder="Enter Paper Type Name"
          value={paperTypeName}
          onChange={e => setPaperTypeName(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PaperTypeForm;
