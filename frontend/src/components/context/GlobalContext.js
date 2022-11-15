import React, { useState } from 'react';

export const Context = React.createContext({});

const GlobalStore = ({ children }) => {
  const [state, setState] = useState();
};

export default GlobalStore;
