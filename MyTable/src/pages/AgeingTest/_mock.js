const data = {
  code: 200,
  data: {
    rows: [
      {
        id: 1581,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_ERROR',
        content:
          '{start_time=1597887813474, last_check_time=1597954557959, shake=0, device_id=620154529, heart_num=0, heart_error_num=2, water2=0, water1=0, heart_repeat_error_num=2, last_heart_time=1597954557959, water=0, username=admin}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 09:43:33 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result:
          '心跳异常,累计次数[0]异常次数[2]连续异常[2]连续阈值[3]异常间隔[3H23m]间隔超期[59m]间隔阈值[2H]允许误差[24m],异常心跳间隔,第2次连续异常',
        createTime: '2020-08-21 04:15:58',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1576,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_ERROR',
        content:
          '{start_time=1597887813474, last_check_time=1597942377547, shake=0, device_id=620154529, heart_num=0, heart_error_num=1, water2=0, water1=0, heart_repeat_error_num=1, last_heart_time=1597942377547, water=0, username=admin}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 09:43:33 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result:
          '心跳异常,累计次数[0]异常次数[1]连续异常[1]连续阈值[3]异常间隔[54564]间隔超限[45924]间隔阈值[1440],异常心跳间隔,第1次连续异常',
        createTime: '2020-08-21 00:52:58',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1611,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_SHAKE',
        content:
          '{"leakErr":0,"macID":"02000005","type":1,"deviceID":"620154529","operator":1,"removeErr":1,"dev_id":620154529,"number":5,"at":1597892979949,"deviceCategory":2,"function":268,"imei":"868474044674008","time":165145837,"ds_id":"3200_0_5750","value":"010C001702000005140814030918000000050000000108","storeErr":0}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 10:33:46 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result: '拆除,累计次数[3]需求次数[1]',
        createTime: '2020-08-20 11:10:22',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1606,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_SHAKE',
        content:
          '{"leakErr":0,"macID":"02000005","type":1,"deviceID":"620154529","operator":1,"removeErr":1,"dev_id":620154529,"number":3,"at":1597892819005,"deviceCategory":2,"function":268,"imei":"868474044674008","time":164984893,"ds_id":"3200_0_5750","value":"010C00170200000514081403062B000000030000000108","storeErr":0}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 10:33:46 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result: '拆除,累计次数[2]需求次数[0]',
        createTime: '2020-08-20 11:07:41',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1601,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_SHAKE',
        content:
          '{"leakErr":0,"macID":"02000005","type":1,"deviceID":"620154529","operator":1,"removeErr":1,"dev_id":620154529,"number":1,"at":1597892598024,"deviceCategory":2,"function":268,"imei":"868474044674008","time":164763912,"ds_id":"3200_0_5750","value":"010C001702000005140814030118000000010000000108","storeErr":0}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 10:33:46 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result: '拆除,累计次数[2]需求次数[0]',
        createTime: '2020-08-20 11:04:00',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1596,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_ERROR',
        content:
          '{"csq":26,"macID":"02000005","active":0,"type":1,"deviceID":"620154529","operator":1,"leakStatus":0,"dev_id":620154529,"number":1,"sVersion":46,"batteryVol1":354,"at":1597892083818,"deviceCategory":2,"batteryVol2":354,"function":256,"hVersion":3,"batteryVol3":354,"imei":"868474044674008","time":164249706,"ds_id":"3200_0_5750","value":"010000330200000514081402361E000000010162016201621A002E000300011500000000000000000000000000000000000000"}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 10:33:46 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result:
          '心跳,累计次数[3]异常次数[2]连续异常[2]连续阈值[3]心跳间隔[597s]间隔超期[-6602s]间隔阈值[7200s]允许误差[1440s],异常心跳间隔,第2次连续异常',
        createTime: '2020-08-20 10:55:25',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1591,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_ERROR',
        content:
          '{"csq":26,"macID":"02000005","active":0,"type":1,"deviceID":"620154529","operator":1,"leakStatus":0,"dev_id":620154529,"number":1,"sVersion":46,"batteryVol1":355,"at":1597891482999,"deviceCategory":2,"batteryVol2":355,"function":256,"hVersion":3,"batteryVol3":355,"imei":"868474044674008","time":163648887,"ds_id":"3200_0_5750","value":"0100003302000005140814022C1C000000010163016301631A002E000300011B00000000000000000000000000000000000000"}',
        method: 'com.czwlyk.produce.testing.task.OldingTask.checkOlding()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 10:33:46 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result:
          '心跳,累计次数[2]异常次数[1]连续异常[1]连续阈值[3]心跳间隔[0s]间隔超期[-7200s]间隔阈值[2H]允许误差[24m],异常心跳间隔,第1次连续异常',
        createTime: '2020-08-20 10:45:28',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1586,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_START',
        content: '老化开始,设备[620154529]状态[2]置位[3]',
        method: 'com.czwlyk.produce.testing.controller.OldingController.start()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 10:33:45 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result: '无',
        createTime: '2020-08-20 10:33:46',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1571,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_START',
        content: '老化开始,创建设备[620154529]',
        method: 'com.czwlyk.produce.testing.controller.OldingController.start()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 09:43:33 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result: '无',
        createTime: '2020-08-20 09:43:33',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
      {
        id: 1566,
        insideId: '3106c-0001',
        outsideId: '868474044674008',
        type: 'OLDING_START',
        content: '老化开始,创建设备[620154529]',
        method: 'com.czwlyk.produce.testing.controller.OldingController.start()',
        params:
          'DTestingDevice(super=BaseEntity(id=21, createTime=Wed Aug 12 17:12:00 GMT+08:00 2020, modifyTime=Thu Aug 20 09:16:58 GMT+08:00 2020, createUser=admin, modifyUser=admin), name=测试780433, insideId=3106c-0001, outsideId=868474044674008, typeId=21, typeName=水淹监控器, model=FWE03-M, modelName=fwe移动版, macId=02000005, printMacId=000005, imsi=460043228203384, status=3)',
        result: '无',
        createTime: '2020-08-20 09:16:59',
        createUser: 'admin',
        createFrom: null,
        createTo: null,
      },
    ],
    total: 11,
    info: {
      start_time: 1597890825716,
      last_check_time: 1597893060037,
      shake: 3,
      device_id: '620154529',
      heart_num: 3,
      heart_error_num: 2,
      water2: 0,
      water1: 0,
      heart_repeat_error_num: 2,
      last_heart_time: 1597892125475,
      water: 0,
      username: 'admin',
    },
  },
};

export default {
  'GET /api/ageingDetail': data,
};
