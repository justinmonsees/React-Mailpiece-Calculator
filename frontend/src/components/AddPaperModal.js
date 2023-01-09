import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Context } from '../components/context/GlobalContext';
import { ENDPOINT_URL } from '../config/config';

const AddPaperModal = props => {
  //get global state from the globalContext
  const [globalState, updateGlobalState] = useContext(Context);

  //if the paper types props have not been loaded, don't render the component
  if (typeof globalState.paperTypes[0] === 'undefined') {
    return <></>;
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //use state for controlled form items
  const [paperName, setPaperName] = useState('');
  const [paperType, setPaperType] = useState(
    globalState.paperTypes[0].name.toLowerCase()
  );
  const [paperWeight, setPaperWeight] = useState('');
  const [paperWeightUnit, setPaperWeightUnit] = useState('lb');
  const [paperThickness, setPaperThickness] = useState('');

  const saveNewPaper = async paper => {
    const newPaperURL = `${ENDPOINT_URL}/papers`;

    console.log(JSON.stringify(paper));
    try {
      const res = await fetch(newPaperURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper),
      });

      updateGlobalState();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitNewPaper = e => {
    //get the paperType id based on paper selected

    const paperTypeID = globalState.paperTypes.find(
      proppaperType => proppaperType.name.toLowerCase() === paperType
    )._id;

    const paper = {
      name: paperName,
      type: paperTypeID,
      caliper: paperThickness,
      weight: paperWeight,
      weightUnit: paperWeightUnit,
    };

    //set a post request to add the paper to the database
    saveNewPaper(paper);

    //reset state values for default paper type and weight unit
    setPaperType(globalState.paperTypes[0].name.toLowerCase());
    setPaperWeightUnit('lb');

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmitNewPaper(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Paper</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Col} controlId="formAddPaper">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Paper Name"
                value={paperName}
                onChange={e => setPaperName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formAddPaper">
              <Form.Label>Type:</Form.Label>
              <Form.Select
                onChange={e => {
                  setPaperType(e.target.value);
                }}
              >
                {globalState.paperTypes.map((paperType, i) => {
                  return (
                    <option key={i} value={paperType.id}>
                      {paperType.name.toLowerCase()}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Row className="mb3">
              <Form.Group as={Col} controlId="formAddPaper">
                <Form.Label>Weight:</Form.Label>
                <Form.Control
                  placeholder="Weight"
                  value={paperWeight}
                  onChange={e => {
                    setPaperWeight(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formAddPaper">
                <Form.Label>Unit:</Form.Label>
                <Form.Select
                  onChange={e => {
                    setPaperWeightUnit(e.target.value);
                  }}
                >
                  <option key="lb" value="lb">
                    lb
                  </option>
                  <option key="gsm" value="gsm">
                    gsm
                  </option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="formAddPaper">
              <Form.Label>Thickness:</Form.Label>
              <Form.Control
                placeholder="Thickness"
                value={paperThickness}
                onChange={e => {
                  setPaperThickness(e.target.value);
                }}
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

export default AddPaperModal;
