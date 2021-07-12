import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


// components
import SkillList from './components/skill/SkillList';
import ChampMeet from './components/champMeet/ChampMeet';

// context
import DataContext from './DataContext';

import ENV from './env';

const SkillOverview = React.lazy(() => import('./data/skill/overview/general.json'));
const SkillDetail = React.lazy(() => import('./data/skill/detail.json'));

const App = () => {
  const [data, setData] = useState(() => {
    const tmp = {};
    ENV.avalData.forEach((name) => {
      tmp[name] = {
        overview: {},
        detail: {},
      };
    });
    return tmp;
  });

  const initData = (dataType, fileName) => {
    if (!ENV.avalData.includes(dataType)) {
      console.warn('error', dataType);
    }
    const tmp = data[dataType];
    if (Object.keys(tmp.detail).length === 0) {
      tmp.detail = SkillDetail;
    }
    if (fileName !== '') {
      tmp.overview[fileName] = SkillOverview;
    }
    setData({ ...data, ...({ ...data[dataType], ...tmp }) });
  };

  return (

    <Router>
      <DataContext.Provider value={{ data, initData }}>
        <Route exact path="/" component={SkillList} />
        <Route path="/skill" component={SkillList} />
      </DataContext.Provider>
    </Router>
  );
};
export default App;
