import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function GraphSpace({graphData}) {

  const dataset = {};
  for (const item of graphData.data.map(item => ({[item.label]: item.value}))){
    Object.assign(dataset, item);
  }
  Object.assign(dataset, {parameter: graphData.parameter});
  
  console.log([dataset]);

  return (
      <>
      {(graphData.type === "Pie_chart") && (
      <PieChart
        series={[{data: graphData.data}]}
        width={400}
        height={200}
      />
      )}

      {(graphData.type === "Bar_chart") && (
      <BarChart
          dataset={[dataset]}
          xAxis={[{ scaleType: 'band', dataKey: "parameter" }]}
          series={graphData.data.map(item => ({dataKey: item.label, label: item.label}))}
          width={500}
          height={300}
      />
      )}
  </>
    );
}

export default GraphSpace;
