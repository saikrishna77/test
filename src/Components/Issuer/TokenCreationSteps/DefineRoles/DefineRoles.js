/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Button, Select, Input, Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import firebase from '../../../../utils/firebase';

const Roles = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  React.useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    if (params.get('edit')) {
      setLoading(true);
      const db = firebase.firestore();
      db.collection('reservedTokenSymbols')
        .doc(symbol + '-' + localStorage.getItem('uid'))
        .get()
        .then(snapshot => {
          try {
            if (snapshot.data().roles) setData(snapshot.data().roles);
            setLoading(false);
          } catch (e) {
            console.log(e);
            props.history.push('/login');
          }
        });
    } else {
      setData([
        {
          key: 1,
          name: 'Role 1',
          roleType: 'Employee',
          role: 'Manager',
          email: 'x@gmail.com'
        }
      ]);
    }
  }, []);

  const handleAdd = () => {
    const newData = {
      key: data.length + 1,
      name: `Role ${data.length + 1}`,
      roleType: 'Employee',
      role: 'Manager',
      email: ''
    };
    let tempData = [...data];
    tempData.push(newData);
    setData(tempData);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    let flag = false;

    for (let i = 0; i < data.length; i++) {
      if (!data[i].roleType || !data[i].email || !data[i].role) {
        message.error('enter all fields');
        flag = true;
        break;
      } else if (
        !new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(data[i].email)
      ) {
        message.error('enter valid emails');
        flag = true;
        break;
      }
    }

    if (!flag) {
      const search = props.location.search;
      const params = new URLSearchParams(search);
      const symbol = params.get('symbol');
      console.log(symbol);
      const db = firebase.firestore();
      try {
        await db
          .collection('reservedTokenSymbols')
          .doc(symbol + '-' + localStorage.getItem('uid'))
          .update({
            roles: data
          });
        setSubmitLoading(false);
      } catch (e) {
        console.error(e);
        setSubmitLoading(false);
      }
      if (params.get('edit')) {
        props.history.push(
          '/issuer/tokenCreation/tokenConfig?symbol=' + symbol + '&edit=true'
        );
      } else {
        props.history.push(
          '/issuer/tokenCreation/tokenConfig?symbol=' + symbol
        );
      }
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

  const onChangeEmail = (e, record) => {
    let tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].key === record.key) {
        tempData[i].email = e.target.value;
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
      title: 'Employee or Affliate Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        return (
          <Input
            style={{ width: 200 }}
            value={text}
            onChange={e => onChangeEmail(e, record)}
          ></Input>
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
        loading={loading}
      />
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={handleSubmit}
          loading={submitLoading}
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
