import { createContext } from 'react';

const DataContext = createContext({
  data: {},
  initData: () => {},
});

export default DataContext;
