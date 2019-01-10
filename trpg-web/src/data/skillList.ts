//value :职业 value2: 兴趣
const baseSkillList = [{
        name: "信用",
        code: "000",
        base: 0,
        value: 0,
        value2: 0,
        isJobPerk: true,
        enableJobPerk: true,
        enableHobPerk: false
    },
    {
        name: "克苏鲁神话",
        code: "100",
        base: 0,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: false
    },
    {
        name: "闪避",
        code: "010",
        base: 0,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "话术",
        code: "150",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "恐吓",
        code: "151",
        base: 15,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "魅惑",
        code: "152",
        base: 15,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "说服",
        code: "1",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "会计",
        code: "101",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "人类学 ",
        code: "102",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "估价",
        code: "103",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "考古",
        code: "104",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },

    {
        name: "攀爬",
        code: "106",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "计算机",
        code: "107",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "乔装",
        code: "108",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "母语",
        code: "118",
        base: 0,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "汽车驾驶",
        code: "110",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "电器维修",
        code: "111",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "电子学",
        code: "112",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "急救",
        code: "114",
        base: 30,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "历史",
        code: "115",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "跳跃",
        code: "117",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },

    {
        name: "法律",
        code: "119",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "图书馆",
        code: "120",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "聆听",
        code: "121",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "锁匠",
        code: "122",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "机械维修",
        code: "123",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "医学",
        code: "124",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "自然学",
        code: "125",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "领航",
        code: "126",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "神秘学",
        code: "127",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "重型机械操作",
        code: "128",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "精神分析",
        code: "130",
        base: 1,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "心理学",
        code: "131",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "骑术",
        code: "132",
        base: 5,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "妙手",
        code: "133",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "侦察",
        code: "134",
        base: 25,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "潜行",
        code: "135",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "游泳",
        code: "136",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "投掷",
        code: "137",
        base: 20,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    },
    {
        name: "追踪",
        code: "138",
        base: 10,
        value: 0,
        value2: 0,
        isJobPerk: false,
        enableJobPerk: false,
        enableHobPerk: true
    }
]

export default {
    readSkillList: function () {
        let jsonStr = JSON.stringify(baseSkillList);
        return JSON.parse(jsonStr);
    }
}