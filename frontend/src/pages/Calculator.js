import React, { useState, useEffect } from "react";
import { Table, Card, CardGroup } from "react-bootstrap";
import * as fa from "react-icons/fa";

import AddComponentModal from "../components/AddComponentModal";

const Calculator = () => {
  const [components, setComponents] = useState(() => {
    const localComps = localStorage.getItem("components");

    return localComps !== null ? JSON.parse(localComps) : [];
  });
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalThickness, setTotalThickness] = useState(0);

  const addComponents = (newComp) => {
    setComponents([...components, newComp]);
  };

  const deleteComponent = (compToDeleteID) => {
    setComponents(components.filter((comp) => comp.id !== compToDeleteID));
  };

  const calcTotals = () => {
    setTotalWeight(
      components
        .map((comp) => comp.weight)
        .reduce((sum, curWeight) => sum + curWeight)
    );
    setTotalThickness(
      components
        .map((comp) => comp.caliper)
        .reduce((sum, curCaliper) => sum + curCaliper)
    );
  };

  useEffect(() => {
    console.log(`Component List update: ${JSON.stringify(components)}`);
    localStorage.setItem("components", JSON.stringify(components));
    if (components.length > 0) {
      calcTotals();
    } else {
      setTotalWeight(0);
      setTotalThickness(0);
    }
  }, [components]);

  return (
    <div>
      <h1>Calculator</h1>
      <AddComponentModal addComponent={addComponents} />

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Component Name</th>
            <th>Weight</th>
            <th>Caliper</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.length === 0 && (
            <tr>
              <td colSpan="6">No components added yet.</td>
            </tr>
          )}

          {components.length > 0 &&
            components.map((comp, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{comp.name}</td>
                  <td>{Number.parseFloat(comp.weight).toFixed(2)} oz</td>
                  <td>{Number.parseFloat(comp.caliper).toFixed(2)} in</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteComponent(comp.id);
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
      <CardGroup>
        <Card className="text-center">
          <Card.Header>Total Weight</Card.Header>
          <Card.Body>
            <Card.Text>
              {Number.parseFloat(totalWeight).toFixed(2)} oz.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Header>Total Thickness</Card.Header>
          <Card.Body>
            <Card.Text>
              {Number.parseFloat(totalThickness).toFixed(2)} in.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default Calculator;
