const data = {
    "mapVersion": "1.3.1",
    "horizontal_spacing": 1000,
    "baseMapVersion": "1.3.0",
    "vertical_spacing": 1000,
    "warehouseCode": "9001",
    "mapName": "菜鸟",
    "chargerList": [],
    "mapCode": "9001",
    "mapWidth": 10000,
    "mapLength": 10000,
    "obstacleList": [],
    "metadatas": [
        ["classic", "name", "dataType"],
        ["point", "orientation", "integer"],
        ["device", "robotTypes", "string[]"],
        ["path", "avoidance", "string"]
    ],
    "zones": ["kckq"],
    "points": [
        ["barCode", "pointCode", "pointType", "zoneCode", "x", "y", "robotRotatable", "availableTopFace", "slamMapCode", "rotatePointList", "waitPointList", "channelType", "channelPointFlag"],
        [1076, "6pYCJn", "PATH", "kckq", 2100, 1000, 1, [], "", [], [], "", true],
        [1567, "d2NzxR", "PATH", "kckq", 3060, 1000, 1, [], "", [], [], "", true],
        [2059, "jeY7Pp", "PATH", "kckq", 3780, 1000, 1, [], "", [], [], "", true],
        [2059, "Ka2xRR", "PATH", "kckq", 2100, 0, 1, [], "", [], [], "", true],
        [2059, "iZNeb6", "PATH", "kckq", 3060, 0, 1, [], "", [], [], "", true],
        [2059, "j5jHRW", "PATH", "kckq", 4630, 1000, 1, [], "", [], [], "", true],
        [2059, "D8arss", "PATH", "kckq", 5300, 1000, 1, [], "", [], [], "", true],
        [2059, "NffTmN", "PATH", "kckq", 5300, 2000, 1, [], "", [], [], "", true],
        [2059, "cDs6DT", "PATH", "kckq", 5300, 3000, 1, [], "", [], [], "", true],
        [2717, "ZzdPsC", "PATH", "kckq", 5300, 4000, 1, [], "", [], [], "", true],
        [2059, "5ANEz2", "PATH", "kckq", 2968, 5000, 1, [], "", [], [], "", true],
        [2059, "f7CFfT", "PATH", "kckq", 3780, 1000, 1, [], "", [], [], "", true]
    ],
    "paths": [
        ["id", "pathCode", "zone", "points", "attrs"],
        [1, "zoneA", [[1000, 1000, 0], [1000, 1000, 0]], { "avoidance": "default" }],
        [2, "zoneA", [[1000, 1000, 0], [1000, 1000, 0], [1000, 1000, 0], [1000, 1000, 0]], { "avoidance": "default" }],
        [3, "zoneC", [[1000, 1000, 0], [1000, 1000, 0], [1000, 1000, 0], [1000, 1000, 0]], { "avoidance": "default" }]
    ],
    "devices": [
        ["id", "deviceCode", "position", "positionWork", "type", "zone", "attrs"],
        [1, [1000, 1000, 0], [1000, 1000, 0], "CHARGE_STATION", "zoneA", { "robotTypes": ["F100B-TLAQ1107B10NN-32", "F100B-TLAQ1107B10NN-33"] }],
        [2, [1000, 1000, 0], [1000, 1000, 0], "CHARGE_STATION", "zoneA", { "robotTypes": ["F100B-TLAQ1107B10NN-32", "F100B-TLAQ1107B10NN-33"] }],
        [3, [1000, 1000, 0], [1000, 1000, 0], "CHARGE_STATION", "zoneA", { "robotTypes": ["F100B-TLAQ1107B10NN-32", "F100B-TLAQ1107B10NN-33"] }]
    ],
    "areas": [
        []
    ]
}

export default formateMapData = () => {
    const pluginName = 'client-map-console-plugin'
    const { mapCode, mapName, mapVersion, zones, points, obstacleList = [] } = data;
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    let mapZoneList = {};
    let newZoneList = {};
    let pointZoneList = new Map();
    const pointsKeys = points[0];
    points.forEach((p, idx) => {
        if (idx === 0) return;
        const pointObj = {};
        pointsKeys.forEach((key, i) => {
            pointObj[key] = p[i];
        })
        const pointCode = pointObj.pointCode;
        const zoneCode = pointObj.zone;
        if (!mapZoneList[zoneCode]) {
            mapZoneList[zoneCode] = {}
        }

        // 获取地图开始和结束点
        if (pointObj.x < minX) { minX = pointObj.x }
        if (pointObj.y < minY) { minY = pointObj.y }
        if (pointObj.x > maxX) { maxX = pointObj.x }
        if (pointObj.y > maxY) { maxY = pointObj.y }

        // 整理库区内的地图点位
        if (!mapZoneList[zoneCode][pointCode]) {
            mapZoneList[zoneCode][pointCode] = []
        }
        pointZoneList.set(pointCode, zoneCode);
        mapZoneList[zoneCode][pointCode] = {
            pointParam: pointObj,
            code: pointCode,
            pointName: pointObj.pointName,
            barCode: pointObj.barCode,
            type: pointObj.pointType,
            viewType: pointObj.pointType,
            point: `(${pointObj.x}, ${pointObj.y})`,
            x: pointObj.x,
            y: pointObj.y,
            orientation: pointObj.orientation
        }
    })
    // 整理地图数据格式
    Object.keys(mapZoneList).forEach(zkey => {
        newZoneList[zkey] = []
        Object.keys(mapZoneList[zkey]).forEach(pkey => {
            newZoneList[zkey].push(mapZoneList[zkey][pkey])
        })
    })
    return { pointZoneList, code: pluginName, mapCode, mapName, mapVersion, minX, minY, maxX, maxY, zoneList: newZoneList, mapZones: zones, obstacleList, cardprops: ctx.helper.i18nListFormat(cardprops, 'mapConsole.card.', ctx) };
}