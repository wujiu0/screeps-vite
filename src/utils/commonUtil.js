import core from '../common/core.js';

export default {
  /**
   *
   * @param callback 回调函数
   * @param tick 延迟tick
   * @param params 回调函数参数
   * @returns 定时器id
   */
  setTimeout(callback, tick, ...params) {
    const timerManager = core.state.timerManager;
    return timerManager.addTimer(callback, tick, params);
  },

  /**
   * 清除定时器
   * @param timerId 定时器id
   */
  clearTimeout(timerId) {
    if (!timerId || typeof timerId !== 'number') return;

    const timerManager = core.state.timerManager;
    timerManager.removeTimer(timerId);
  },
};
