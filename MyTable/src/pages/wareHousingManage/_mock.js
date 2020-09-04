const data = {
    code: 200,
    data: {
      rows: [
        {
          id:1,
          name: "测试name",
          insideId: '3106c-0001',
          outsideId: '868474044674008',
          imsi: '460043228202789',
          macId: '021F0599',
          printMacId: '2033048',
          model: 'FWE03-P',
          modelName: 'FWEPC版',
          typeName: '水淹监控器',
          status:'5',
          createTime: '2020-08-28',
        },
        {
            id:2,
            name: "测试name2",
            insideId: '3106c-0002',
            outsideId: '868474044674002',
            imsi: '460043228202782',
            macId: '021F0592',
            printMacId: '2033042',
            model: 'FWE03-P',
            modelName: 'FWEPC版',
            typeName: '水淹监控器',
            status:'9',
            createTime: '2020-08-28',
          },
      ],
      total: 2,
    },
  };
  
  export default {
    'GET /api/stock/page': data,
  };
  