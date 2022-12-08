import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Context } from './context/GlobalContext';
import {
  calcSelfMailer,
  calcInsert,
  calcBooklet
} from '../helpers/calcFunctions';
import uuid from 'react-uuid';

const DEC_REGEX = '^[1-9]\\d*(.\\d+)?$';
const INT_REGEX = '\\d*';

const AddComponentModal = props => {
  console.log('re-rendered');

  //get global state from the globalContext
  const [globalState] = useContext(Context);

  //refactored input variables into 1 state object
  const [formValues, setFormValues] = useState({
    smPaperName: {
      value: '',
      pattern: '',
      isInvalid: false,
      touched: false
    },
    smHeight: {
      value: '',
      pattern: DEC_REGEX,
      isInvalid: true,
      touched: false
    },
    smWidth: {
      value: '',
      pattern: DEC_REGEX,
      isInvalid: true,
      touched: false
    },
    smNumPanels: {
      value: '',
      pattern: INT_REGEX,
      isInvalid: true,
      touched: false
    },
    insPaperName: {
      value: '',
      pattern: '',
      isInvalid: false,
      touched: false
    },
    insHeight: {
      value: '',
      pattern: DEC_REGEX,
      isInvalid: true,
      touched: false
    },
    insWidth: {
      value: '',
      pattern: DEC_REGEX,
      isInvalid: true,
      touched: false
    },
    insNumPanels: {
      value: '',
      pattern: INT_REGEX,
      isInvalid: true,
      touched: false
    },
    insNumPages: {
      value: '',
      pattern: INT_REGEX,
      isInvalid: true,
      touched: false
    },
    bkCvrPaperName: {
      value: '',
      pattern: '',
      isInvalid: false,
      touched: false
    },
    bkTxtPaperName: {
      value: '',
      pattern: '',
      isInvalid: false,
      touched: false
    },
    bkHeight: {
      value: '',
      pattern: DEC_REGEX,
      isInvalid: true,
      touched: false
    },
    bkWidth: {
      value: '',
      pattern: DEC_REGEX,
      isInvalid: true,
      touched: false
    },
    bkNumPages: {
      value: '',
      pattern: INT_REGEX,
      isInvalid: true,
      touched: false
    },
    envName: {
      value: '',
      pattern: '',
      isInvalid: false,
      touched: false
    }
  });

  //component state variable
  const [displaySelfMailer, setDisplaySelfMailer] = useState('');
  const [displayInsert, setDisplayInsert] = useState('d-none');
  const [displayBooklet, setDisplayBooklet] = useState('d-none');
  const [displayEnvelope, setDisplayEnvelope] = useState('d-none');

  const COMP_TYPES = ['Self Mailer', 'Insert', 'Booklet', 'Envelope'];

  const [compType, setCompType] = useState('Self Mailer');

  const updateValues = e => {
    const input = e.target.name;

    setFormValues({
      ...formValues,
      [input]: { ...formValues[input], value: e.target.value, touched: true }
    });
  };

  const updateMultipleValues = (inputs, values) => {
    let newFormValues = { ...formValues };

    inputs.forEach(
      input =>
        (newFormValues = {
          ...newFormValues,
          [input]: { ...newFormValues[input], ...values }
        })
    );

    setFormValues(newFormValues);
  };

  const validateInput = e => {
    const input = e.target.name;

    const inputPattern = formValues[input].pattern;
    const regex = new RegExp(inputPattern);
    //console.log(`REGEX RESULT: ${regex.test(e.target.value)}`);

    if (!regex.test(e.target.value)) {
      setFormValues({
        ...formValues,
        [input]: {
          ...formValues[input],
          isInValid: true
        }
      });
    } else {
      setFormValues({
        ...formValues,
        [input]: {
          ...formValues[input],
          isInValid: false
        }
      });
    }
  };

  const resetDefaults = () => {
    //default display
    setDisplaySelfMailer('d-none');
    setDisplayInsert('d-none');
    setDisplayBooklet('d-none');
    setDisplayEnvelope('d-none');

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!REVISIT THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //you can only call the update multiple values function once within a function
    // const papersToReset = ['smPaperName', 'insPaperName', 'bkCvrPaperName','bkTxtPaperName', 'envName'];

    if (globalState.papers.length > 0) {
      //updateMultipleValues(papersToReset,{value:globalState.papers[0]._id})
      // setSmPaperName(globalState.papers[0]._id);
      // setInsPaperName(globalState.papers[0]._id);
      // setBkCvrPaperName(globalState.papers[0]._id);
      // setBkTxtPaperName(globalState.papers[0]._id);
      // setEnvName(globalState.envelopes[0]._id);
    }

    //default self mailer input values
    // const inputValuesToReset = [
    //   'smWidth',
    //   'smHeight',
    //   'smNumPanels',
    //   'insWidth',
    //   'insHeight',
    //   'insNumPanels',
    //   'insNumPages',
    //   'bkWidth',
    //   'bkHeight',
    //   'bkNumPags'
    // ];

    // const valuesObj = { value: '', touched: false };

    // updateMultipleValues(inputValuesToReset, valuesObj);
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

    //exp
    // const input = 'smHeight';
    // setFormValues({
    //   ...formValues,
    //   [input]: { ...formValues[input], value: '', touched: false }
    // });

    // setSmPaperName(globalState.papers[0]._id);
    // setInsPaperName(globalState.papers[0]._id);
    // setBkCvrPaperName(globalState.papers[0]._id);
    // setBkTxtPaperName(globalState.papers[0]._id);
    // setEnvName(globalState.envelopes[0]._id);

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
        const smHeight = formValues.smHeight.value;
        const smWidth = formValues.smWidth.value;
        const smNumPanels = formValues.smNumPanels.value;

        selectedPaper = globalState.papers.find(
          paper => paper._id === formValues.smPaperName.value
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
        const insHeight = formValues.insHeight.value;
        const insWidth = formValues.insWidth.value;
        const insNumPanels = formValues.insNumPanels.value;
        const insNumPages = formValues.insNumPages.value;

        selectedPaper = globalState.papers.find(
          paper => paper._id === formValues.insPaperName.value
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
        const bkHeight = formValues.bkHeight.value;
        const bkWidth = formValues.bkWidth.value;
        const bkNumPages = formValues.bkNumPages.value;

        selectedCvrPaper = globalState.papers.find(
          paper => paper._id === formValues.bkCvrPaperName.value
        );

        selectedTxtPaper = globalState.papers.find(
          paper => paper._id === formValues.bkTxtPaperName.value
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
        selectedEnv = globalState.envelopes.find(
          env => env._id === formValues.envName.value
        );
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
                  name="smPaperName"
                  placeholder="Paper Name"
                  value={formValues.smPaperName.value}
                  onChange={e => updateValues(e)}
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
                    name="smHeight"
                    aria-label="Height"
                    placeholder="Height"
                    value={formValues.smHeight.value}
                    onChange={e => updateValues(e)}
                    onBlur={e => validateInput(e)}
                    isInvalid={
                      formValues.smHeight.isInValid &&
                      formValues.smHeight.touched
                    }
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    name="smWidth"
                    aria-label="Width"
                    placeholder="Width"
                    value={formValues.smWidth.value}
                    onChange={e => updateValues(e)}
                    onBlur={e => validateInput(e)}
                    isInvalid={
                      formValues.smWidth.isInValid && formValues.smWidth.touched
                    }
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Panels:</Form.Label>
                <Form.Control
                  name="smNumPanels"
                  placeholder="# of Panels"
                  value={formValues.smNumPanels.value}
                  onChange={e => updateValues(e)}
                  onBlur={e => validateInput(e)}
                  isInvalid={
                    formValues.smNumPanels.isInValid &&
                    formValues.smNumPanels.touched
                  }
                />
              </Form.Group>
            </div>

            <div id="Insert" className={displayInsert}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Name:</Form.Label>
                <Form.Select
                  name="insPaperName"
                  placeholder="Paper Name"
                  value={formValues.insPaperName.values}
                  onChange={e => updateValues(e)}
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
                    name="insHeight"
                    aria-label="Height"
                    placeholder="Height"
                    value={formValues.insHeight.value}
                    onChange={e => updateValues(e)}
                    onBlur={e => validateInput(e)}
                    isInvalid={
                      formValues.insHeight.isInValid &&
                      formValues.insHeight.touched
                    }
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    name="insWidth"
                    aria-label="Width"
                    placeholder="Width"
                    value={formValues.insWidth.value}
                    onChange={e => updateValues(e)}
                    onBlur={e => validateInput(e)}
                    isInvalid={
                      formValues.insWidth.isInValid &&
                      formValues.insWidth.touched
                    }
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Panels:</Form.Label>
                <Form.Control
                  name="insNumPanels"
                  placeholder="# of Panels"
                  value={formValues.insNumPanels.value}
                  onChange={e => updateValues(e)}
                  onBlur={e => validateInput(e)}
                  isInvalid={
                    formValues.insNumPanels.isInValid &&
                    formValues.insNumPanels.touched
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Pages:</Form.Label>
                <Form.Control
                  name="insNumPages"
                  placeholder="# of Pages"
                  value={formValues.insNumPages.value}
                  onChange={e => updateValues(e)}
                  onBlur={e => validateInput(e)}
                  isInvalid={
                    formValues.insNumPages.isInValid &&
                    formValues.insNumPages.touched
                  }
                />
              </Form.Group>
            </div>

            <div id="Booklet" className={displayBooklet}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Cover Paper Name:</Form.Label>
                <Form.Select
                  name="bkCvrPaperName"
                  placeholder="Paper Name"
                  value={formValues.bkCvrPaperName.value}
                  onChange={e => updateValues(e)}
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
                  name="bkTxtPaperName"
                  placeholder="Paper Name"
                  value={formValues.bkTxtPaperName.value}
                  onChange={e => updateValues(e)}
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
                    name="bkHeight"
                    aria-label="Height"
                    placeholder="Height"
                    value={formValues.bkHeight.value}
                    onChange={e => updateValues(e)}
                    onBlur={e => validateInput(e)}
                    isInvalid={
                      formValues.bkHeight.isInValid &&
                      formValues.bkHeight.touched
                    }
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    name="bkWidth"
                    aria-label="Width"
                    placeholder="Width"
                    value={formValues.bkWidth.value}
                    onChange={e => updateValues(e)}
                    onBlur={e => validateInput(e)}
                    isInvalid={
                      formValues.bkWidth.isInValid && formValues.bkWidth.touched
                    }
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Pages:</Form.Label>
                <Form.Control
                  name="bkNumPages"
                  placeholder="# of Pages"
                  value={formValues.bkNumPages.value}
                  onChange={e => updateValues(e)}
                  onBlur={e => validateInput(e)}
                  isInvalid={
                    formValues.bkNumPages.isInValid &&
                    formValues.bkNumPages.touched
                  }
                />
              </Form.Group>
            </div>
            <div id="Envelope" className={displayEnvelope}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Envelope Name:</Form.Label>
                <Form.Select
                  name="envName"
                  placeholder="Envelope Name"
                  value={formValues.envName.value}
                  onChange={e => updateValues(e)}
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
