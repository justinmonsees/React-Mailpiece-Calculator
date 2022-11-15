import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import * as fa from 'react-icons/fa';
import uuid from 'react-uuid';

const PAPER_URL = 'http://localhost:3000/papers/';

const PaperTable = props => {
  //use state for controlled form items
  const [paperIdToEdit, setPaperIdToEdit] = useState('');
  const [paperName, setPaperName] = useState('');
  const [paperType, setPaperType] = useState('');
  const [paperWeight, setPaperWeight] = useState('');
  const [paperWeightUnit, setPaperWeightUnit] = useState('lb');
  const [paperThickness, setPaperThickness] = useState('');
  const [show, setShow] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertChanged, setAlertChanged] = useState(false);

  useEffect(() => {
    setAlertChanged(false);
  }, [alertChanged]);

  const createAlert = (variant, msg) => {
    const newAlert = {
      id: uuid(),
      variant: variant,
      msg: msg,
      show: true
    };
    setAlerts([...alerts, newAlert]);

    setTimeout(() => {
      console.log(newAlert.id);
      //closeAlert(newAlert.id);
    }, 5000);
  };

  const closeAlert = alertId => {
    const alertToClose = alerts.find(alert => alert.id === alertId);

    alertToClose.show = false;
    setAlertChanged(true);
    setAlerts([]);
    //setAlerts(alerts.filter(alert => alert.id !== alertId));
    console.log(`ALERTS LIST: ${alerts.length}`);
  };

  const handleShow = paperId => {
    setPaperIdToEdit(paperId);

    const curPaper = props.papers.find(paper => paper._id === paperId);

    setPaperName(curPaper.name);
    setPaperType(
      props.paperTypes
        .find(paperType => paperType._id === curPaper.type)
        .name.toLowerCase()
    );
    setPaperWeight(curPaper.weight);
    setPaperWeightUnit(curPaper.weightUnit);
    setPaperThickness(curPaper.caliper);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const editPaper = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: paperName,
        type: props.paperTypes.find(
          propPaperType =>
            propPaperType.name.toLowerCase() === paperType.toLowerCase()
        )._id,
        weight: paperWeight,
        weightUnit: paperWeightUnit,
        caliper: paperThickness
      })
    };
    try {
      await fetch(PAPER_URL + paperIdToEdit, requestOptions);
    } catch (e) {
      console.log('make an error message toast');
    }

    props.onPaperModified(true);
    handleClose();
    console.log('Paper Updated Successfully zzzzzz');
    createAlert('success', 'Paper Updated Successfully! Great Job!');
  };

  const deletePaper = async paperId => {
    try {
      await fetch(PAPER_URL + paperId, { method: 'DELETE' });
    } catch (e) {
      console.log('make a toast error notification');
    }

    props.onPaperModified(true);
    console.log('Paper Deleted Successfully');
  };

  return (
    <>
      {alerts.length > 0 &&
        alerts.map(alert => {
          return (
            <Alert
              key={alert.id}
              variant={alert.variant}
              dismissible={true}
              show={alert.show}
              onClose={e => {
                closeAlert(alert.id);
                //console.log('delete this alert: ' + alert.show);
              }}
            >
              {alert.msg}
            </Alert>
          );
        })}

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Paper Name</th>
            <th>Weight</th>
            <th>Caliper</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.papers.length === 0 && (
            <tr>
              <td colSpan="4">No papers exist</td>
            </tr>
          )}

          {props.papers.length > 0 &&
            props.papers.map((paper, i) => {
              return (
                <tr key={paper._id}>
                  <td>{i + 1}</td>
                  <td>{paper.name}</td>
                  <td>
                    {paper.weight} {paper.weightUnit}
                  </td>
                  <td>{paper.caliper}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={e => {
                        handleShow(paper._id);
                      }}
                    >
                      <fa.FaEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={e => {
                        e.preventDefault();
                        deletePaper(paper._id);
                      }}
                    >
                      <fa.FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={e => {
            e.preventDefault();
            editPaper();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Paper</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Col} controlId="formEditPaper">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Paper Name"
                value={paperName}
                onChange={e => setPaperName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formEditPaper">
              <Form.Label>Type:</Form.Label>
              <Form.Select
                defaultValue={paperType}
                onChange={e => {
                  setPaperType(e.target.value);
                }}
              >
                {props.paperTypes.map((paperType, i) => {
                  return (
                    <option key={i} value={paperType.id}>
                      {paperType.name.toLowerCase()}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Row className="mb3">
              <Form.Group as={Col} controlId="formEditPaper">
                <Form.Label>Weight:</Form.Label>
                <Form.Control
                  placeholder="Weight"
                  value={paperWeight}
                  onChange={e => {
                    setPaperWeight(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formEditPaper">
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

            <Form.Group as={Col} controlId="formEditPaper">
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
    </>
  );
};

export default PaperTable;
