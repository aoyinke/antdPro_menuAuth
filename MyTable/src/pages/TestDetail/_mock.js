const data = {
    "code": 200,
    "data": {
        "192.168.0.1": "无数据",
        "currentMacId": "2032005",
        "192.168.2.183": {
            "success": "asdasd",
            "startTimeStamp": 1596780947006,
            "comInfo": "$BOOT#\r\n$VERSION:0x002E#\r\nInput Config Cmd ....7\r\nPRODUCTION MODE\r\n--command-- $READ_PARAM#\r\n$OK#\r\nNB_SEND:AT+CIMI\r\nNB_REC:\r\n460113024464866\r\nOK\r\nNB_SEND:AT+CGSN=1\r\nNB_REC:\r\n+CGSN:867726038416899\r\nOK\r\n$ID:021F0184#\r\n$IMEI:867726038416899#\r\n$IMSI:460113024464866#\r\n$VOL:3.46#\r\n$ANGLE:180.0#\r\n$BTI:02#\r\n$HTI:14#\r\n$RANGE:00#\r\n$THRESHOLD:64#\r\n$MSTI:000A#\r\n$WMODE:01#\r\n$SHITDELAY:01#\r\n$MODULE:BC28#\r\n--command-- $OK#\r\n$WATER#\r\n--command-- $OK#\r\n--command-- $CONNECT#\r\n$SHAKE#\r\nNB_REC:NB_REC:NB_REC:\r\nBoot: Unsigned\r\nSecurity B.. NB_REC:Verified\r\nProtocol A.. ity B.. NB_REC:Verified\r\nApps A...... ity B.. NB_REC:Verified\r\nApps A...... ity B.. NB_REC:\r\nREBOOT_CAUSE_SECURITY_PMU_POWER_ON_RESET\r\nNeul \r\nOK\r\nstart init NB_IOT 1 Time\r\n-----MODULE:BC28 !-----\r\nNB_SEND:AT+CIMI\r\nNB_REC:\r\n460113024464866\r\nOK\r\nNB_SEND:AT+CSQ\r\nNB_REC:\r\n+CSQ:20,99\r\nOK\r\nNB_SEND:AT+NCDP=117.60.157.137,5683\r\nNB_REC:\r\nOK\r\nNB_SEND:AT+NMSTATUS?\r\nNB_REC:\r\n+NMSTATUS:INIITIALISED\r\nOK\r\nNB_SEND:AT+NMSTATUS?\r\nNB_REC:\r\n+NMSTATUS:INIITIALISED\r\nOK\r\nNB_REC:\r\n+QLWEVTIND:0\r\nTIALISED\r\nOK\r\nNB_REC:\r\n+QLWEVTIND:3\r\nTIALISED\r\nOK\r\nNB_SEND:AT+NMSTATUS?\r\nNB_REC:\r\n+NMSTATUS:MO_DATA_ENABLED\r\nOK\r\nNB_SEND:AT+CCLK?\r\nNB_REC:\r\n+CCLK:20/08/07,06:16:37+32\r\nOK\r\n--command-- $SET_WMODE:01#\r\n$OK#\r\n--command-- $SET_BTI:02#\r\n$OK#\r\n$OK#\r\n",
            "useTimeStamp": 13000000,
            "insideId": "31067-0003",
            "imei": "867726038416899",
            "platformId": "0a059ff5-2ee0-48b9-a62e-ee0fcba71c3e",
            "testTarget": {
                "productionMode": "success",
                "readParam": "success",
                "readParams": {
                    "id": "021F0184",
                    "bti": "02",
                    "wmode": "01",
                    "module": "BC28",
                    "imei": "867726038416899",
                    "id10": "2032004",
                    "imsi": "460113024464866",
                    "shitdelay": "01",
                    "threshold": "64",
                    "range": "00",
                    "hti": "14",
                    "msti": "000A",
                    "vol": "3.46"
                },
                "initDevice": "dasdasdasdasd",
                "createDevice": "success",
                "connectDevice": "success",
                "deleteDevice": "success",
                "readDevice": "success",
                "writeDevice": "success",
                "writeParam": "success",
                "writeParams": {
                    "id": "021F0184",
                    "bti": "02",
                    "wmode": "01",
                    "id10": "2032004"
                },
                "printDevice": "success",
                "functionTesting": "开始功能测试",
                "functionParam": {
                    "shake": true,
                    "water": true,
                    "water1": false,
                    "water2": false
                }
            }
        }
    }
}


export default {
    'GET /testing/testing':data,
    // 'POST /testing/testing':{code:200}
}