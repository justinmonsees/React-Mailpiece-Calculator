import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Context } from './context/GlobalContext';
import {
  calcSelfMailer,
  calcInsert,
  calcBooklet
} from '../helpers/calcFunctions';
import uuid from 'react-uuid';

const AddComponentModal = props => {
  //get global state from the globalContext
  const [globalState] = useContext(Context);

  //self mailer state input variables
  const [smPaperName, setSmPaperName] = useState('');
  const [smHeight, setSmHeight] = useState('');
  const [smWidth, setSmWidth] = useState('');
  const [smNumPanels, setSmNumPanels] = useState('');

  //insert state input variables
  const [insPaperName, setInsPaperName] = useState('');
  const [insHeight, setInsHeight] = useState('');
  const [insWidth, setInsWidth] = useState('');
  const [insNumPanels, setInsNumPanels] = useState('');
  const [insNumPages, setInsNumPages] = useState('');

  //booklet state input variables
  const [bkCvrPaperName, setBkCvrPaperName] = useState('');
  const [bkTxtPaperName, setBkTxtPaperName] = useState('');
  const [bkHeight, setBkHeight] = useState('');
  const [bkWidth, setBkWidth] = useState('');
  const [bkNumPages, setBkNumPages] = useState('');

  //envelope state input variable
  const [envName, setEnvName] = useState('');

  //component state variable
  const [displaySelfMailer, setDisplaySelfMailer] = useState('');
  const [displayInsert, setDisplayInsert] = useState('d-none');
  const [displayBooklet, setDisplayBooklet] = useState('d-none');
  const [displayEnvelope, setDisplayEnvelope] = useState('d-none');

  const COMP_TYPES = ['Self Mailer', 'Insert', 'Booklet', 'Envelope'];

  const [compType, setCompType] = useState('Self Mailer');

  const resetDefaults = () => {
    //default display
    setDisplaySelfMailer('d-none');
    setDisplayInsert('d-none');
    setDisplayBooklet('d-none');
    setDisplayEnvelope('d-none');

    if (globalState.papers.length > 0) {
      setSmPaperName(globalState.papers[0]._id);
      setInsPaperName(globalState.papers[0]._id);
      setBkCvrPaperName(globalState.papers[0]._id);
      setBkTxtPaperName(globalState.papers[0]._id);
      setEnvName(globalState.envelopes[0]._id);
    }

    //default self mailer input values
    setSmWidth('');
    setSmHeight('');
    setSmNumPanels('');
    //default insert input values
    setInsWidth('');
    setInsHeight('');
    setInsNumPanels('');
    setInsNumPages('');
    //default booklet input values
    setBkWidth('');
    setBkHeight('');
    setBkNumPages('');
  };

  useEffect(() => {
    resetDefaults();

    if (compType === 'Self Mailer') {
      setDisplaySelfMailer('');
    } else if (compType === 'Insert') {
      setDisplayInsert('');
    } else if (compType === 'Booklet') {
      setDisplayBooklet('');
    } else {
      setDisplayEnvelope('');
    }
  }, [compType]);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    resetDefaults();
    setDisplaySelfMailer('');
    setCompType('Self Mailer');

    setSmPaperName(globalState.papers[0]._id);
    setInsPaperName(globalState.papers[0]._id);
    setBkCvrPaperName(globalState.papers[0]._id);
    setBkTxtPaperName(globalState.papers[0]._id);
    setEnvName(globalState.envelopes[0]._id);

    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleSubmitNewComponent = e => {
    e.preventDefault();

    let totalWeight = 0;
    let totalThickness = 0;
    let selectedPaper, selectedCvrPaper, selectedTxtPaper, selectedEnv;
    let compName;

    switch (compType) {
      case 'Self Mailer':
        selectedPaper = globalState.papers.find(
          paper => paper._id === smPaperName
        );

        ({ totalWeight, totalThickness } = calcSelfMailer(
          selectedPaper.ozPerSqIn,
          selectedPaper.caliper,
          smHeight,
          smWidth,
          smNumPanels
        ));

        compName = `${smWidth}x${smHeight} Self Mailer: ${selectedPaper.name}`;
        break;
      case 'Insert':
        selectedPaper = globalState.papers.find(
          paper => paper._id === insPaperName
        );

        ({ totalWeight, totalThickness } = calcInsert(
          selectedPaper.ozPerSqIn,
          selectedPaper.caliper,
          insHeight,
          insWidth,
          insNumPanels,
          insNumPages
        ));

        compName = `${insWidth}x${insHeight} ${insNumPages} Insert: ${selectedPaper.name}`;
        break;
      case 'Booklet':
        selectedCvrPaper = globalState.papers.find(
          paper => paper._id === bkCvrPaperName
        );

        selectedTxtPaper = globalState.papers.find(
          paper => paper._id === bkTxtPaperName
        );

        ({ totalWeight, totalThickness } = calcBooklet(
          selectedCvrPaper.ozPerSqIn,
          selectedCvrPaper.caliper,
          selectedTxtPaper.ozPerSqIn,
          selectedTxtPaper.caliper,
          bkHeight,
          bkWidth,
          bkNumPages
        ));

        compName = `${bkWidth}x${bkHeight} ${bkNumPages} Booklet`;
        break;
      case 'Envelope':
        selectedEnv = globalState.envelopes.find(env => env._id === envName);
        totalWeight = selectedEnv.weight;
        totalThickness = selectedEnv.caliper;

        compName = `Envelope: ${selectedEnv.name}`;
        break;
      default:
        console.log('Incorrect component type');
        break;
    }

    props.addComponent({
      id: uuid(),
      name: compName,
      weight: totalWeight,
      caliper: totalThickness
    });

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={e => {
            handleSubmitNewComponent(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Component</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId="formAddComponent">
              <Form.Label>Component Type:</Form.Label>
              <Form.Select onChange={e => setCompType(e.target.value)}>
                {COMP_TYPES.map((CompType, i) => {
                  return (
                    <option key={i} value={CompType}>
                      {CompType}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <hr />
            <div id="SelfMailer" className={displaySelfMailer}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Name:</Form.Label>
                <Form.Select
                  placeholder="Paper Name"
                  value={smPaperName}
                  onChange={e => setSmPaperName(e.target.value)}
                  className="is-valid"
                >
                  {globalState.papers.map((paper, i) => {
                    return (
                      <option key={i} value={paper._id}>
                        {paper.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Flat Size:</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    aria-label="Height"
                    placeholder="Height"
                    value={smHeight}
                    onChange={event => setSmHeight(event.target.value)}
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    aria-label="Width"
                    placeholder="Width"
                    value={smWidth}
                    onChange={e => setSmWidth(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Panels:</Form.Label>
                <Form.Control
                  placeholder="# of Panels"
                  value={smNumPanels}
                  onChange={e => {
                    setSmNumPanels(e.target.value);
                  }}
                />
              </Form.Group>
            </div>

            <div id="Insert" className={displayInsert}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Name:</Form.Label>
                <Form.Select
                  placeholder="Paper Name"
                  value={insPaperName}
                  onChange={e => setInsPaperName(e.target.value)}
                >
                  {globalState.papers.map((paper, i) => {
                    return (
                      <option key={i} value={paper._id}>
                        {paper.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Flat Size:</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Height"
                    placeholder="Height"
                    value={insHeight}
                    onChange={event => setInsHeight(event.target.value)}
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    aria-label="Width"
                    placeholder="Width"
                    value={insWidth}
                    onChange={e => setInsWidth(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Panels:</Form.Label>
                <Form.Control
                  placeholder="# of Panels"
                  value={insNumPanels}
                  onChange={e => {
                    setInsNumPanels(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Pages:</Form.Label>
                <Form.Control
                  placeholder="# of Pages"
                  value={insNumPages}
                  onChange={e => {
                    setInsNumPages(e.target.value);
                  }}
                />
              </Form.Group>
            </div>

            <div id="Booklet" className={displayBooklet}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Cover Paper Name:</Form.Label>
                <Form.Select
                  placeholder="Paper Name"
                  value={bkCvrPaperName}
                  onChange={e => setBkCvrPaperName(e.target.value)}
                >
                  {globalState.papers.map((paper, i) => {
                    return (
                      <option key={i} value={paper._id}>
                        {paper.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Text Paper Name:</Form.Label>
                <Form.Select
                  placeholder="Paper Name"
                  value={bkTxtPaperName}
                  onChange={e => setBkTxtPaperName(e.target.value)}
                >
                  {globalState.papers.map((paper, i) => {
                    return (
                      <option key={i} value={paper._id}>
                        {paper.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Flat Size:</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Height"
                    placeholder="Height"
                    value={bkHeight}
                    onChange={event => setBkHeight(event.target.value)}
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    aria-label="Width"
                    placeholder="Width"
                    value={bkWidth}
                    onChange={e => setBkWidth(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Pages:</Form.Label>
                <Form.Control
                  placeholder="# of Pages"
                  value={bkNumPages}
                  onChange={e => {
                    setBkNumPages(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
            <div id="Envelope" className={displayEnvelope}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Envelope Name:</Form.Label>
                <Form.Select
                  placeholder="Envelope Name"
                  value={envName}
                  onChange={e => setEnvName(e.target.value)}
                >
                  {globalState.envelopes.map((envelope, i) => {
                    return (
                      <option key={i} value={envelope._id}>
                        {envelope.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </div>
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
        Add Component
      </Button>
    </>
  );
};

export default AddComponentModal;
