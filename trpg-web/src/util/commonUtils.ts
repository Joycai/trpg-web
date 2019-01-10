"use strict";
/**
 * 判断是否在数组内
 * @param {T} obj
 * @param {Array(T)} objArray
 */
export const isInArray = function<T>(obj: T, objArray: T[]): boolean {
  return objArray.indexOf(obj) > -1;
};

/**
 * 复制对象
 * @param {Object} src
 * @returns {Object}
 */
export const copyObj = function(src: any) {
  return JSON.parse(JSON.stringify(src));
};
