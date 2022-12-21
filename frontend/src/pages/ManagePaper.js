//import PaperTypeForm from "../components/PaperTypeForm";
import AddPaperModal from "../components/AddPaperModal";
import PaperTable from "../components/PaperTable";

import React from "react";

const ManagePaper = () => {
  return (
    <>
      <h1>Manage Papers</h1>
      <AddPaperModal />

      <PaperTable />
    </>
  );
};

export default ManagePaper;
