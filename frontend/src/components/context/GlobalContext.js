import React, { useState, useEffect } from 'react';

export const Context = React.createContext({});

const GlobalStore = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    papers: [],
    paperTypes: [],
    envelopes: []
  });

  const updateGlobalState = async () => {
    try {
      const paperResponse = await fetch('http://localhost:3000/papers');
      const curPapers = await paperResponse.json();
      const paperTypeResponse = await fetch('http://localhost:3000/paperTypes');
      const curPaperTypes = await paperTypeResponse.json();
      const envelopeResponse = await fetch('http://localhost:3000/envelopes');
      const curEnvelopes = await envelopeResponse.json();

      setGlobalState({
        papers: curPapers,
        paperTypes: curPaperTypes,
        envelopes: curEnvelopes
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function initState() {
      await updateGlobalState();
      console.log('use effect activated');
    }
    initState();
  }, []);

  return (
    <Context.Provider value={[globalState, updateGlobalState]}>
      {children}
    </Context.Provider>
  );
};

export default GlobalStore;
