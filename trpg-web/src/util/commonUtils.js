'use strict';
/**
 * 判断是否在数组内
 * @param {T} obj 
 * @param {Array(T)} objArray 
 */
export const isInArray = function(obj, objArray){
    return objArray.indexOf(obj) > -1;
}