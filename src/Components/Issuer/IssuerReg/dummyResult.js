const a = [
  {
    user: 'UNKNOWN',
    upr: 'UNKNOWN',
    ednaScoreCard: {
      sc: [
        {
          test: 'ed:1',
          details: 'true'
        }
      ],
      etr: [
        {
          test: 'ed:20',
          details: 'true'
        },
        {
          test: 'ed:31',
          details: 'true'
        },
        {
          test: 'ed:2',
          details: 'true'
        },
        {
          test: 'ed:1',
          details: 'true'
        },
        {
          test: 'ed:28',
          details: 'true'
        }
      ],
      er: {
        profile: 'DEFAULT',
        reportedRule: {
          name: 'Sandbox Rule',
          details: '[Fired] details',
          description: 'Rule fired from sandbox',
          resultCode: 'ACCEPT',
          ruleId: 1000,
          testResults: [
            {
              test: 'ed:1',
              ts: 1582439839303,
              stage: '1',
              fired: true,
              condition: {
                left: 'ed:1',
                right: true,
                operator: 'eq'
              },
              details: '[Fired] details'
            }
          ]
        }
      }
    },
    frn: 'Sandbox Rule',
    frp: 'ACCEPT',
    frd: '[Fired] details',
    mtid: 'bc183f5d99d043508fb37ea4811daa24',
    state: 'A',
    tid: 'bc183f5d99d043508fb37ea4811daa24',
    erd: 'Unknown User',
    res: 'ACCEPT',
    rcd: '131,101,50005,150,1000,202'
  }
];
