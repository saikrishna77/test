import React, { useState, useEffect } from 'react';
import { Card, Select, Table } from 'antd';

const TokenPhase = props => {
  const [show, setShow] = useState(false);
  const [allPhaseNames, setAllPhaseNames] = useState([]);
  const [phaseName, setPhaseName] = useState('');
  const [phaseStart, setPhaseStart] = useState();
  const [phaseEnd, setPhaseEnd] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(props.data);
    const arr = [];
    for (const key in props.data) {
      arr.push(
        <Select.Option key={key} value={key}>
          {key}
        </Select.Option>
      );
    }
    setAllPhaseNames(arr);
  }, [props.data]);

  const columns = [
    {
      title: 'Minimum Investment Amount',
      dataIndex: 'investmentAmount',
      key: 'investmentAmount'
    },
    {
      title: '% Bonus',
      dataIndex: 'bonus',
      key: 'bonus'
    }
  ];

  const onChangePhaseName = value => {
    setPhaseName(value);
    setPhaseStart(props.data[value].phaseStartDate);
    setPhaseEnd(props.data[value].phaseEndDate);
    setData(props.data[value].data);
  };

  return (
    <div>
      <Card
        onClick={() => {
          setShow(!show);
        }}
        style={{ width: '50%', margin: 'auto', marginTop: '30px' }}
        hoverable
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Token Phase</div>
      </Card>
      {show ? (
        <Card style={{ width: '50%', margin: 'auto' }}>
          <Select style={{ width: '200px' }} onChange={onChangePhaseName}>
            {allPhaseNames}
          </Select>
          <div>
            <b>Phase Name:</b>{phaseName}
          </div>
          <div>
            <b>Phase Start Date:</b>{new Date(phaseStart).toLocaleDateString()}
          </div>
          <div>
            <b>Phase End Date:</b>{new Date(phaseEnd).toLocaleDateString()}
          </div>
          <Table
            size='small'
            ellipsis={false}
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </Card>
      ) : null}
    </div>
  );
};

export default TokenPhase;
