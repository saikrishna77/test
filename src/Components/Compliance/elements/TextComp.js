import React from 'react';
import { Typography } from 'antd';
import { withRouter } from 'react-router-dom';
const { Text } = Typography;

const TextComp = props => {
  return (
    <Text>
      <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
        {props.name}
      </span>
      :{props.value}
    </Text>
  );
};
export default withRouter(TextComp);
