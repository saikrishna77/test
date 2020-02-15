import React, { useState } from 'react';
import {
  Input,
  DatePicker,
  Table,
  InputNumber,
  Button,
  Popconfirm,
  Modal
} from 'antd';

const Phase = () => {
  const [setNextModal, setSetNextModal] = useState(false);
  const [data, setData] = useState([
    {
      key: '1',
      investmentAmount: 1,
      bonus: 32
    },
    {
      key: '2',
      investmentAmount: 2,
      bonus: 42
    }
  ]);

  const DisplayModal = () => {
    Modal.confirm({
      title: 'Add another vesting schedule?',
      content:
        'Vesting schedule saved & Now you can choose to add another vesting schedule or you can go to the next section',
      okText: 'Next',
      cancelText: 'Add',
      // okButtonProps: { loading: loading },
      // cancelButtonProps: { loading: loading },
      onOk() {
        console.log('next pressed');
      },
      onCancel() {
        console.log('add pressed');
      }
    });
  };

  const columns = [
    {
      title: 'Minimum Investment Amount',
      dataIndex: 'investmentAmount',
      key: 'investmentAmount',
      render: (value, render) => {
        return <InputNumber value={value} />;
      }
    },
    {
      title: '% Bonus',
      dataIndex: 'bonus',
      key: 'bonus',
      render: (value, render) => {
        return <InputNumber value={value} max={100} />;
      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDeleteRow(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null
    }
  ];

  const handleDeleteRow = key => {
    let tempdata = [...data];
    setData(tempdata.filter(item => item.key !== key));
  };

  const addRow = () => {
    setData([
      ...data,
      {
        key: data.length + 1,
        investmentAmount: 0,
        bonus: 0
      }
    ]);
  };

  const onSubmit = () => {
    setSetNextModal(true);
  };

  return (
    <>
      {setNextModal ? DisplayModal() : 'null'}
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          Enter the name of the phase:
          <div style={{ width: '200px' }}>
            <Input />
          </div>
        </div>
        <div>
          Start date of the phase:
          <DatePicker style={{ marginLeft: '10px', marginTop: '10px' }} />
        </div>
        <div>
          End date of the phase:
          <DatePicker style={{ marginLeft: '10px', marginTop: '10px' }} />
        </div>
        <br />
        <div>Offer Bonus</div>
        <Button onClick={addRow} style={{ marginLeft: 0 }}>
          Add Row
        </Button>
        <Table
          style={{ width: '60%', margin: 'auto' }}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        <div
          style={{
            textAlign: 'right',
            marginRight: '120px',
            marginTop: '50px'
          }}
        >
          <Button type={'primary'} onClick={onSubmit}>
            Submit Phase
          </Button>
        </div>
      </div>
    </>
  );
};

export default Phase;
