//mainAttr: 1~8 依次代表str con siz dex app int pow edu
const jobList = [{
    name: '会计师',
    code: '2',
    mainAttr: [
    ],
    credRange: {
        min: 30,
        max: 70
    },
    jobSkill: [
        "120",
        "100",
        "121",
        "122",
        "130",
        "135"
    ],
    exJobNum: 2, //额外任选,
    customJobGroup: [{
        num: 1,
        skills: [
            "104",
            "114"
        ]
    }],
    jobSkillMsg: "任选2项特长",
    info: ""
}, {
    name: '杂技演员',
    code: '3',
    mainAttr: [
        4
    ],
    credRange: {
        min: 30,
        max: 70
    },
    jobSkill: [
        "105",
        "110",
        "118",
        "138",
        "135",
        "137"
    ],
    exJobNum: 2, //额外任选,
    customJobGroup: [],
    jobSkillMsg: "任选2项特长",
    info: ""
}]

export default {
    getJobList: function () {
        let jsonStr = JSON.stringify(jobList);
        return JSON.parse(jsonStr);
    },
    findJobInfo: function (code) {
        for (var idx = 0, siz = jobList.length; idx < siz; idx++) {
            let item = jobList[idx]
            if (item.code == code) {
                return JSON.parse(JSON.stringify(item))
            }
        }
        return undefined;
    }
}