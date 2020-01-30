import React from 'react';
import { Table, Button, Select, Input, Popconfirm } from 'antd';
import { withRouter } from 'react-router-dom';

const Roles = props => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData([
      {
        key: 1,
        name: 'Role 1',
        roleType: 'Employee',
        role: 'Manager'
      }
    ]);
  }, []);

  const handleAdd = () => {
    const newData = {
      key: data.length + 1,
      name: `Role ${data.length + 1}`,
      roleType: 'Employee',
      role: 'Manager'
    };
    let tempData = [...data];
    tempData.push(newData);
    setData(tempData);
  };

  const handleSubmit = () => {
    props.history.push('/tokenCreation/tokenConfig');
  };

  const handleDeleteRow = key => {
    let tempdata = [...data];
    setData(tempdata.filter(item => item.key !== key));
  };

  const columns = [
    {
      title: 'Role',
      dataIndex: 'name',
      key: 'name',
      render: text => {
        return <a>{text}</a>;
      }
    },
    {
      title: 'Employee or Affliate',
      dataIndex: 'roleType',
      key: 'roleType',
      render: (text, record) => {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Select a person'
            optionFilterProp='children'
            value={text}
            // onChange={e => onChangeFD(e, record)}
            disabled={
              data[record.key - 1] &&
              data[record.key - 2] &&
              parseInt(data[record.key - 1].EOD) - 1 ===
                parseInt(data[record.key - 2].EOD)
            }
          >
            <Select.Option value='Employee'>Employee</Select.Option>
            <Select.Option value='Affliate'>Affliate</Select.Option>
          </Select>
        );
      }
    },
    {
      title: 'Define Role',
      key: 'role',
      dataIndex: 'role',
      render: (text, record) => {
        return (
          <Input
            // onBlur={e => onChangeVestPres(e, record)}
            value={text}
          />
        );
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
  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <Button onClick={handleAdd} type='primary' style={{ marginTop: '5%' }}>
          Add a row
        </Button>
      </div>
      <Table
        tableLayout='auto'
        columns={columns}
        dataSource={data}
        style={{ marginTop: '2%' }}
        pagination={false}
      />
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={handleSubmit}
          type='primary'
          style={{ marginTop: '5%' }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default withRouter(Roles);
