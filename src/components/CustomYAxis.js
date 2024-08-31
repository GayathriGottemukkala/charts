// CustomYAxis.js
import React from 'react';
import { YAxis as RechartsYAxis } from 'recharts';

const CustomYAxis = (props) => {
  const { tickCount = 5, ...otherProps } = props;
  return <RechartsYAxis tickCount={tickCount} {...otherProps} />;
};

export default CustomYAxis;
