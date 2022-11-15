//import PaperTypeForm from "../components/PaperTypeForm";
import AddPaperModal from "../components/AddPaperModal";
import PaperTable from "../components/PaperTable";

import React, { useState, useEffect } from "react";

const ManagePaper = () => {
  const [paperTypes, setPaperTypes] = useState([]);
  const [papers, setPapers] = useState([]);
  const [paperModified, setPaperModified] = useState(false);

  const getPaperTypes = async () => {
    try {
      const response = await fetch("http://localhost:3000/paperTypes");
      const data = await response.json();
      setPaperTypes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPapers = async () => {
    try {
      const response = await fetch("http://localhost:3000/papers");
      const data = await response.json();

      setPapers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("use effect activated");
    getPaperTypes();
    getPapers();
    console.log(paperModified);
    setPaperModified(false);
  }, [paperModified]);

  return (
    <>
      <AddPaperModal paperTypes={paperTypes} onPaperAdd={setPaperModified} />

      <PaperTable
        papers={papers}
        paperTypes={paperTypes}
        onPaperModified={setPaperModified}
      />
    </>
  );
};

export default ManagePaper;
