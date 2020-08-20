let defaultMenu = [
    {
      "path":"/test",
      "name":"动态路由",
      "children":null,
      "authority": ["admin"]
    },
    {
    "path": "/overview",
    "name": "数据总览",
    "children": [{
        "path": "/overview/daily", 
        "name": "analysis12",
        "children": null,
        "authority": null
    }],
    "authority": ["admin", "user"]
    },
    {
    "path": "/function",
    "name": "gongneng",
    "children": [{
        "path": "/function/sign",
        "name": "sign111",
        "children": null,
        "authority": null
    }, {
        "path": "/function/task",
        "name": "task111",
        "children": null,
        "authority": ["admin"]
    }, {
        "path": "/function/pay",
        "name": "task111",
        "children": null,
        "authority": ["admin"]
    }],
    "authority": null
}]

export { defaultMenu }
export default {
    // 'GET /api/menu': defaultMenu
};
