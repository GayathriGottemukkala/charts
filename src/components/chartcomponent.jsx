import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import CustomYAxis from './CustomYAxis';

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('daily');
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/data.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleClick = (data) => {
    if (data && data.activePayload && data.activePayload[0]) {
      alert(`Timestamp: ${data.activeLabel}, Value: ${data.activePayload[0].value}`);
    } else {
      console.error('Failed to access activePayload');
    }
  };

  const filterData = (timeframe) => {
    // Placeholder for data filtering based on timeframe
    return data;
  };

  const exportChart = () => {
    if (chartRef.current && chartRef.current.container) {
      const chartNode = chartRef.current.container.firstChild; // Assuming Recharts renders the chart in a div
      if (chartNode) {
        toBlob(chartNode)
          .then(blob => {
            saveAs(blob, 'chart.png');
          })
          .catch(error => {
            console.error('Error exporting chart:', error);
          });
      } else {
        console.error('Chart node not found');
      }
    } else {
      console.error('Chart ref is not set');
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setTimeframe('daily')}>Daily</button>
        <button onClick={() => setTimeframe('weekly')}>Weekly</button>
        <button onClick={() => setTimeframe('monthly')}>Monthly</button>
        <button onClick={exportChart}>Export Chart</button>
      </div>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={filterData(timeframe)} onClick={handleClick} ref={chartRef}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <CustomYAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
