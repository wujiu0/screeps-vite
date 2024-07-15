export default {
  // TODO 实现定时器
  /**
   *
   * @param {*} func
   * @param {*} tick
   */
  setTimeout_tick(func, tick) {
    const start = Game.time;
    const end = start + tick;
    if (Game.time >= end) {
      func();
    }
  },
  clearTimeout_tick(timeoutId) {
    
  },
};
