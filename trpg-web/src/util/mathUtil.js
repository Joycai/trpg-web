'use strict';
const ran1N = function (max) {
    parseInt(Math.random()*max,10)+1;
    Math.floor(Math.random()*max)+1;
    return Math.ceil(Math.random()*max);
}

const ranD6 = function () {
    return ran1N(6)
}

export default{
    ranD6:ranD6
}