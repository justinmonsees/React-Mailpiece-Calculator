import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Context } from './context/GlobalContext';
import {
  calcSelfMailer,
  calcInsert,
  calcBooklet
} from '../helpers/calcFunctions';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';

const DEC_REGEX = new RegExp('^[1-9]\\d*(.\\d+)?$');
const INT_REGEX = new RegExp('^[1-9]\\d*$');

const AddComponentModal = props => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ mode: 'onBlur' });
  console.log('re-rendered');

  console.log(errors);

  //get global state from the globalContext
  const [globalState] = useContext(Context);

  //refactored input variables into 1 state object

  //component state variable
  const [displaySelfMailer, setDisplaySelfMailer] = useState('');
  const [displayInsert, setDisplayInsert] = useState('d-none');
  const [displayBooklet, setDisplayBooklet] = useState('d-none');
  const [displayEnvelope, setDisplayEnvelope] = useState('d-none');

  const COMP_TYPES = ['Self Mailer', 'Insert', 'Booklet', 'Envelope'];

  const [compType, setCompType] = useState('Self Mailer');

  const resetDefaults = () => {
    //clear any form errors
    clearErrors();

    //default display
    setDisplaySelfMailer('d-none');
    setDisplayInsert('d-none');
    setDisplayBooklet('d-none');
    setDisplayEnvelope('d-none');

    const papersToReset = [
      'smPaperName',
      'insPaperName',
      'bkCvrPaperName',
      'bkTxtPaperName',
      'envName'
    ];

    if (globalState.papers.length > 0) {
      papersToReset.forEach(paper =>
        setValue(paper, globalState.papers[0]._id)
      );
    }

    //default self mailer input values
    const inputValuesToReset = [
      'smWidth',
      'smHeight',
      'smNumPanels',
      'insWidth',
      'insHeight',
      'insNumPanels',
      'insNumPages',
      'bkWidth',
      'bkHeight',
      'bkNumPags'
    ];

    inputValuesToReset.forEach(input =>
      setValue(input, '', { shouldDirty: false, shouldTouch: false })
    );
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

    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleSubmitNewComponent = data => {
    // console.log(JSON.stringify(data));
    console.log(`ERRORS: ${JSON.stringify(errors)}`);

    let totalWeight = 0;
    let totalThickness = 0;
    let selectedPaper, selectedCvrPaper, selectedTxtPaper, selectedEnv;
    let compName;

    switch (compType) {
      case 'Self Mailer':
        selectedPaper = globalState.papers.find(
          paper => paper._id === data.smPaperName
        );

        ({ totalWeight, totalThickness } = calcSelfMailer(
          selectedPaper.ozPerSqIn,
          selectedPaper.caliper,
          data.smHeight,
          data.smWidth,
          data.smNumPanels
        ));

        compName = `${data.smWidth}x${data.smHeight} Self Mailer: ${selectedPaper.name}`;
        break;
      case 'Insert':
        selectedPaper = globalState.papers.find(
          paper => paper._id === data.insPaperName
        );

        ({ totalWeight, totalThickness } = calcInsert(
          selectedPaper.ozPerSqIn,
          selectedPaper.caliper,
          data.insHeight,
          data.insWidth,
          data.insNumPanels,
          data.insNumPages
        ));

        compName = `${data.insWidth}x${data.insHeight} ${data.insNumPages} Insert: ${selectedPaper.name}`;
        break;
      case 'Booklet':
        selectedCvrPaper = globalState.papers.find(
          paper => paper._id === data.bkCvrPaperName
        );

        selectedTxtPaper = globalState.papers.find(
          paper => paper._id === data.bkTxtPaperName
        );

        ({ totalWeight, totalThickness } = calcBooklet(
          selectedCvrPaper.ozPerSqIn,
          selectedCvrPaper.caliper,
          selectedTxtPaper.ozPerSqIn,
          selectedTxtPaper.caliper,
          data.bkHeight,
          data.bkWidth,
          data.bkNumPages
        ));

        compName = `${data.bkWidth}x${data.bkHeight} ${data.bkNumPages} Booklet`;
        break;
      case 'Envelope':
        selectedEnv = globalState.envelopes.find(
          env => env._id === data.envName
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
        <Form noValidate onSubmit={handleSubmit(handleSubmitNewComponent)}>
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
                  {...register('smPaperName')}
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
                <InputGroup hasValidation className="mb-3 ">
                  <Form.Control
                    aria-label="Height"
                    placeholder="Height"
                    {...register('smHeight', {
                      pattern: DEC_REGEX
                    })}
                    isInvalid={errors.smHeight ? true : false}
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    aria-label="Width"
                    placeholder="Width"
                    {...register('smWidth', {
                      pattern: DEC_REGEX
                    })}
                    isInvalid={errors.smWidth ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Input must be a valid decimal number
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Panels:</Form.Label>
                <Form.Control
                  placeholder="# of Panels"
                  {...register('smNumPanels', {
                    pattern: INT_REGEX
                  })}
                  isInvalid={errors.smNumPanels ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  Input must be a valid whole number
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div id="Insert" className={displayInsert}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Name:</Form.Label>
                <Form.Select
                  placeholder="Paper Name"
                  {...register('insPaperName')}
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
                    {...register('insHeight', {
                      pattern: DEC_REGEX
                    })}
                    isInvalid={errors.insHeight ? true : false}
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    aria-label="Width"
                    placeholder="Width"
                    {...register('insWidth', {
                      pattern: DEC_REGEX
                    })}
                    isInvalid={errors.insWidth ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Input must be a valid decimal number
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Panels:</Form.Label>
                <Form.Control
                  placeholder="# of Panels"
                  {...register('insNumPanels', {
                    pattern: INT_REGEX
                  })}
                  isInvalid={errors.insNumPanels ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  Input must be a valid whole number
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Pages:</Form.Label>
                <Form.Control
                  placeholder="# of Pages"
                  {...register('insNumPages', {
                    pattern: INT_REGEX
                  })}
                  isInvalid={errors.insNumPages ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  Input must be a valid whole number
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div id="Booklet" className={displayBooklet}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Cover Paper Name:</Form.Label>
                <Form.Select
                  placeholder="Paper Name"
                  {...register('bkCvrPaperName')}
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
                  {...register('bkTxtPaperName')}
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
                    {...register('bkHeight', {
                      pattern: DEC_REGEX
                    })}
                    isInvalid={errors.bkHeight ? true : false}
                  />
                  <InputGroup.Text>X</InputGroup.Text>
                  <Form.Control
                    aria-label="Width"
                    placeholder="Width"
                    {...register('bkWidth', {
                      pattern: DEC_REGEX
                    })}
                    isInvalid={errors.bkWidth ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    Input must be a valid decimal number
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Number of Pages:</Form.Label>
                <Form.Control
                  placeholder="# of Pages"
                  {...register('bkNumPages', {
                    pattern: INT_REGEX
                  })}
                  isInvalid={errors.bkNumPages ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  Input must be a valid whole number
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div id="Envelope" className={displayEnvelope}>
              <Form.Group as={Col} controlId="formAddComponent">
                <Form.Label>Envelope Name:</Form.Label>
                <Form.Select
                  placeholder="Envelope Name"
                  {...register('envName')}
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
