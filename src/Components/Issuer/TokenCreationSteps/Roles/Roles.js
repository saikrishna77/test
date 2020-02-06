import React from 'react';
import { Table, Button, Select, Input, Popconfirm } from 'antd';
import { withRouter } from 'react-router-dom';
import firebase from '../../../../utils/firebase';

const Roles = props => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    if (params.get('edit')) {
      const db = firebase.firestore();
      db.collection('reservedTokenSymbols')
        .doc(symbol + '-' + localStorage.getItem('uid'))
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          setData(snapshot.data().roles);
        });
    } else {
      setData([
        {
          key: 1,
          name: 'Role 1',
          roleType: 'Employee',
          role: 'Manager'
        }
      ]);
    }
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

  const handleSubmit = async () => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    console.log(symbol);
    const db = firebase.firestore();
    await db
      .collection('reservedTokenSymbols')
      .doc(symbol + '-' + localStorage.getItem('uid'))
      .update({
        roles: data
      });
    if (params.get('edit')) {
      props.history.push(
        '/issuer/tokenCreation/tokenConfig?symbol=' + symbol + '&edit=true'
      );
    } else {
      props.history.push('/issuer/tokenCreation/tokenConfig?symbol=' + symbol);
    }
  };

  const handleDeleteRow = key => {
    let tempdata = [...data];
    setData(tempdata.filter(item => item.key !== key));
  };

  const onChangeType = (e, record) => {
    let tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].key === record.key) {
        tempData[i].roleType = e;
        break;
      }
    }
    setData(tempData);
  };

  const onChangeRole = (e, record) => {
    let tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].key === record.key) {
        tempData[i].role = e.target.value;
        break;
      }
    }
    setData(tempData);
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
            onChange={e => onChangeType(e, record)}
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
        return <Input onChange={e => onChangeRole(e, record)} value={text} />;
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