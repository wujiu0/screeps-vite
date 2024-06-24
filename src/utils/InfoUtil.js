import config from '../config/config.js';

const InfoUtil = {
  /**
   * errorCode 映射
   * @param {number} errCode
   */
  errorMap(errCode) {
    //   + 0 OK 这个操作已经成功纳入计划。
    //
    // + -1 ERR_NOT_OWNER 你不是该 creep 的所有者，或者其他玩家已经占领或者预定了该房间的控制器。
    //
    // + -3 ERR_NAME_EXISTS 已经有一个叫这个名字的 creep 了。
    //
    // + -4 ERR_BUSY 这个 creep 依然在孵化中。
    //
    // + -5 ERR_NOT_FOUND 未找到 extractor。你必须建造一个 extractor 来开采矿物。
    //
    // + -6 ERR_NOT_ENOUGH_RESOURCES 目标中已经没有可采集的能量或者矿物。
    //
    // + -7 ERR_INVALID_TARGET 目标不是有效的 source 或者 mineral 对象。
    //
    // + -8 ERR_FULL 此 creep 的存储已经满了。
    //
    // + -9 ERR_NOT_IN_RANGE 目标太远了。
    //
    // + -10 ERR_INVALID_ARGS resourceType 不是 RESOURCE_* 常量之一, 或者 amount 数量错误。
    //
    // + -11 ERR_TIRED extractor 仍在冷却中。
    //
    // + -12 ERR_NO_BODYPART 这个 creep 身上没有 WORK 部件。
    const map = new Map([
      [999, 'No operation is required for the time being'],
      [0, 'OK'],
      [-1, 'ERR_NOT_OWNER'],
      [-3, 'ERR_NAME_EXISTS'],
      [-4, 'ERR_BUSY'],
      [-5, 'ERR_NOT_FOUND'],
      [-6, 'ERR_NOT_ENOUGH_RESOURCES'],
      [-7, 'ERR_INVALID_TARGET'],
      [-8, 'ERR_FULL'],
      [-9, 'ERR_NOT_IN_RANGE'],
      [-10, 'ERR_INVALID_ARGS'],
      [-11, 'ERR_TIRED'],
      [-12, 'ERR_NO_BODYPART'],
    ]);
    return map.get(errCode);
  },

  /**
   * 打印日志信息
   * @param {Creep} creep
   * @param {string} funcName
   * @param {number} resCode
   */
  log(creep, funcName, resCode) {
    if (resCode === 0) {
      this.info(creep, funcName, resCode);
    } else if (resCode >= -4) {
      this.warn(creep, funcName, resCode);
    } else {
      this.error(creep, funcName, resCode)
    }

  },
  /**
   * info
   * @param {Creep} creep
   * @param {string} funcName
   * @param {number} resCode
   */
  info(creep, funcName, resCode) {
    (config.LOG_LEVEL === 'info') &&
    console.log(`INFO: ${creep.name}: ${funcName}:${resCode}: ${this.errorMap(resCode)}`);
  },
  /**
   * warn
   * @param {Creep} creep
   * @param {string} funcName
   * @param {number} resCode
   */
  warn(creep, funcName, resCode) {
    (config.LOG_LEVEL === 'info' || config.LOG_LEVEL === 'warn') &&
    console.log(`INFO: ${creep.name}: ${funcName}:${resCode}: ${this.errorMap(resCode)}`);
  },
  /**
   * error
   * @param {Creep} creep
   * @param {string} funcName
   * @param {number} resCode
   */
  error(creep, funcName, resCode) {
    console.log(`INFO: ${creep.name}: ${funcName}:${resCode}: ${this.errorMap(resCode)}`);
  },
};
export default InfoUtil;
