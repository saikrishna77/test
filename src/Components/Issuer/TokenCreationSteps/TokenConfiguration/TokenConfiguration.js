import { Menu, Card } from 'antd';
import React from 'react';
import TokenType from './TokenType/TokenType';
import { Row, Icon } from 'antd';
import Vesting from './Vesting/Vesting';
import Phase from './Phase/Phase';
import { withRouter } from 'react-router-dom';
import AddRoles from './AddRoles/AddRoles';

const TokenConfig = props => {
  const [current, setCurrent] = React.useState('addroles');
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    if (params.get('edit')) {
      setEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const handleNextClick = next => {
    setCurrent(next);
  };
  return (
    <Card style={{ marginTop: '20px' }}>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='tType' disabled={current !== 'tType'}>
          Token Type and Details &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='vesting' disabled={current !== 'vesting'}>
          Vesting Schedule & lock period &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='addroles' disabled={current !== 'addroles'}>
          Add Roles &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='phase' disabled={current !== 'phase'}>
          Phase &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='dividend' disabled={current !== 'dividend'}>
          Dividend &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='capTable' disabled={current !== 'capTable'}>
          Cap Table &nbsp;
        </Menu.Item>
      </Menu>
      {current === 'tType' ? (
        <Row justify='center' style={{ paddingTop: '2%' }}>
          <b>
            Define Your Token Type, Number Of Investors, Lock Period For
            Investors
          </b>
          <div style={{ paddingLeft: '20%', paddingTop: '3%' }}>
            <TokenType NextTab={handleNextClick} editMode={edit} />
          </div>
        </Row>
      ) : current === 'vesting' ? (
        <Row justify='center' style={{ paddingTop: '2%' }}>
          <b>Vesting Schedule</b>
          <div style={{ marginTop: '1%' }}>
            <Vesting
              NextTab={handleNextClick}
              editMode={edit}
              setEditMode={setEdit}
            />
          </div>
        </Row>
      ) : current === 'addroles' ? (
        <div>
          <b>Add Roles</b>
          <AddRoles
            NextTab={handleNextClick}
            editMode={edit}
            setEditMode={setEdit}
          />
        </div>
      ) : current === 'phase' ? (
        <div>
          <b>Phase</b>
          <Phase
            NextTab={handleNextClick}
            editMode={edit}
            setEditMode={setEdit}
          />
        </div>
      ) : current === 'dividend' ? (
        <div>Dividend Yet to be built</div>
      ) : current === 'capTable' ? (
        <div>Cap table yet to be built</div>
      ) : null}
    </Card>
  );
};

export default withRouter(TokenConfig);
