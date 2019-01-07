'use strict';
/**
 * 判断是否在数组内
 * @param {T} obj 
 * @param {Array(T)} objArray 
 */
export const isInArray = function(obj, objArray){
    return objArray.indexOf(obj) > -1;
}

/**
 * 复制对象
 * @param {Object} src 
 * @returns {Object}
 */
export const copyObj = function (src) {
    return JSON.parse(JSON.stringify(src));
}