/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Button, Select, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import firebase from '../../../../../utils/firebase';

const Roles = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [vestingNames, setVestingNames] = React.useState([]);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  React.useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    setLoading(true);
    const db = firebase.firestore();
    db.collection('reservedTokenSymbols')
      .doc(symbol + '-' + localStorage.getItem('uid'))
      .get()
      .then(snapshot => {
        try {
          if (snapshot.data().vestingSchedules) {
            setVestingNames(Object.keys(snapshot.data().vestingSchedules));
          }
          if (snapshot.data().roles) setData(snapshot.data().roles);
          setLoading(false);
        } catch (e) {
          console.log(e);
          props.history.push('/login');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setSubmitLoading(true);
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
    } catch (e) {
      console.error(e);
    }
    setSubmitLoading(false);
    props.NextTab('phase');
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

  const renderVestingSelectOptions = () => {
    return vestingNames.map((e, i) => {
      return (
        <Select.Option key={i} value={e}>
          {e}
        </Select.Option>
      );
    });
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
            disabled
            value={text}
          >
            <Select.Option value='Employee'>Employee</Select.Option>
            <Select.Option value='Affliate'>Affliate</Select.Option>
          </Select>
        );
      }
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (text, record) => {
        return <Input disabled value={text} />;
      }
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text, record) => {
        return <Input disabled value={text} />;
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
        columns={columns2}
        dataSource={data}
        style={{ marginTop: '2%' }}
        pagination={false}
        loading={loading}
      />
      <div style={{ textAlign: 'right' }}>
        <Button
          type='default'
          style={{ marginRight: '20px' }}
          onClick={() => {
            props.setEditMode(true);
            props.NextTab('vesting');
          }}
        >
          Back
        </Button>
        <Button
          type='dashed'
          style={{ marginRight: '20px' }}
          onClick={() => {
            const search = props.location.search;
            const params = new URLSearchParams(search);
            const symbol = params.get('symbol');
            props.history.push(
              '/issuer/tokenCreation/roles?symbol=' + symbol + '&edit=true'
            );
          }}
        >
          Edit Define Roles
        </Button>
        <Button
          onClick={handleSubmit}
          type='primary'
          loading={submitLoading}
          style={{ marginTop: '5%' }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default withRouter(Roles);
