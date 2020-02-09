/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Button, Select, Input, Popconfirm } from 'antd';
import { withRouter } from 'react-router-dom';
import firebase from '../../../../utils/firebase';

const Roles = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [vestingNames, setVestingNames] = React.useState([]);

  React.useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    if (params.get('edit')) {
      setEdit(true);
      setLoading(true);
      const db = firebase.firestore();
      db.collection('reservedTokenSymbols')
        .doc(symbol + '-' + localStorage.getItem('uid'))
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          if (snapshot.data().vestingSchedules) {
            setVestingNames(Object.keys(snapshot.data().vestingSchedules));
          }
          if (snapshot.data().roles) setData(snapshot.data().roles);
          setLoading(false);
        });
    } else {
      setEdit(false);
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

  const onChangeType = (e, record, type) => {
    let tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].key === record.key) {
        if (type === 'roleType') {
          tempData[i].roleType = e;
        } else if (type === 'vesting') {
          tempData[i].vesting = e;
        }
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

  const renderVestingSelectOptions = () => {
    return vestingNames.map((e, i) => {
      return (
        <Select.Option key={i} value={e}>
          {e}
        </Select.Option>
      );
    });
    // let tempArr = [];
    // for (let i = 0; i < vestingNames.length; i++) {
    //   tempArr.push(
    //     <Select.Option value={vestingNames[i]}>{vestingNames[i]}</Select.Option>
    //   );
    // }
    // return tempArr;
  };

  const columns2 = [
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
            onChange={e => onChangeType(e, record, 'roleType')}
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
      title: 'vesting',
      dataIndex: 'vesting',
      key: 'vesting',
      render: (text, record) => {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Select a person'
            optionFilterProp='children'
            value={text}
            onChange={e => onChangeType(e, record, 'vesting')}
          >
            {renderVestingSelectOptions()}
          </Select>
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
            onChange={e => onChangeType(e, record, 'roleType')}
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

  const renderTable = () => {
    if (edit) {
      return (
        <Table
          tableLayout='auto'
          columns={columns2}
          dataSource={data}
          style={{ marginTop: '2%' }}
          pagination={false}
          loading={loading}
        />
      );
    } else {
      return (
        <Table
          tableLayout='auto'
          columns={columns}
          dataSource={data}
          style={{ marginTop: '2%' }}
          pagination={false}
          loading={loading}
        />
      );
    }
  };

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <Button onClick={handleAdd} type='primary' style={{ marginTop: '5%' }}>
          Add a row
        </Button>
      </div>
      {renderTable()}
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
