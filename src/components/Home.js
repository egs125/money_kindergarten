import React from 'react';
import ReactECharts from 'echarts-for-react';

const Home = ({ chartOption }) => (
  <div>
    <ReactECharts
      option={chartOption}
      notMerge={true}
      lazyUpdate={true}
      style={{height: '300px', width: '700px'}}
    />
  </div>
);

export default Home;
