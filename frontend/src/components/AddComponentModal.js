import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const AddComponentModal = props => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //use state for controlled form items
  const [compType, setCompType] = useState('Self Mailer');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [numPanels, setNumPanels] = useState('');
  const [numPages, setNumPages] = useState('');
  const [paperName, setPaperName] = useState('');

  const handleSubmitNewComponent = e => {
    console.log('component added');

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Component</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId="formAddCompType">
              <Form.Label>Component Type:</Form.Label>
              <Form.Select onChange={e => setCompType(e.target.value)} />
            </Form.Group>
            <hr />
            <Form.Group as={Col} controlId="formAddPaper">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Paper Name"
                value={paperName}
                onChange={e => setPaperName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Button variant="primary" onClick={handleShow}>
        Add Paper
      </Button>
    </>
  );
};

export default AddComponentModal;
