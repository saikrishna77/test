import React from 'react';
import { Steps, Icon, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import TokenConfiguration from './TokenConfiguration/TokenConfiguration';
import ReserveToken from './ReserveToken/ReserveToken';
import Roles from './Roles/Roles';

const { Step } = Steps;

const TokenCreationSteps = props => {
  const [stepType, setStepType] = React.useState();

  React.useEffect(() => {
    setStepType(props.match.params.stepType);
    console.log(stepType);
  });

  const stepOnClick = e => {
    props.history.push('/issuer/tokenCreation/' + e);
  };

  console.log(props.match.params.stepNo);
  return (
    <div style={{ width: '60%', marginLeft: '20%', marginTop: '2%' }}>
      <Card>
        <div style={{ marginRight: '10%' }}>
          <Steps>
            <Step
              status={
                stepType === 'roles' ||
                stepType === 'tokenConfig' ||
                stepType === 'reserve'
              }
              onClick={() => stepOnClick('reserve')}
              title='Reserve Token Symbol'
              style={{ cursor: 'pointer' }}
              icon={<Icon type='safety' />}
            />
            <Step
              status={stepType === 'roles' || stepType === 'tokenConfig'}
              title='Add Roles'
              style={{ cursor: 'pointer' }}
              onClick={() => stepOnClick('roles')}
              icon={<Icon type='solution' />}
            />
            <Step
              status={stepType === 'tokenConfig'}
              title='Token Configuration'
              style={{ cursor: 'pointer' }}
              onClick={() => stepOnClick('tokenConfig')}
              icon={<Icon type='edit' />}
            />
            {/* <Step status='wait' title='Done' icon={<Icon type='smile-o' />} /> */}
          </Steps>
        </div>
        {stepType === 'reserve' ? <ReserveToken /> : null}
        {stepType === 'tokenConfig' ? <TokenConfiguration /> : null}
        {stepType === 'roles' ? <Roles /> : null}
      </Card>
    </div>
  );
};

export default withRouter(TokenCreationSteps);
