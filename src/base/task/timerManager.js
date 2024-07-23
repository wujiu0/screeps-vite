/**
 * 我们想要稳定的在tick之间保存信息，只能借助Memory对象，其底层实现是利用JSON的持久化存储，而json没有办法保存函数，
 * 所以此处实现的定时器的回调函数只能是在代码中预定义的函数，而不能是在运行时动态生成的函数（函数表达式）。
 */
  // TODO
  //   timerQueue中保存的值都为不变值， 可以考虑保存在global中，减少解析Memory次数
export class Timer {

  /**
   *
   * @param {number} id
   * @param {string} callback
   * @param {number} delay
   * @param {Array} params
   */
  constructor(id, callback, delay, params) {
    this.id = id;
    this.cbName = typeof callback === 'function' ? callback.name : callback;
    this.params = params;
    this.endTick = Game.time + delay;
  }

  /**
   * 执行定时任务
   * @param {Timer} timer
   * @returns {boolean}
   */
  static run(timer) {
    const {cbName, params = []} = timer;
    const callback = _.get(Game, cbName, this.#defaultCallback);
    return callback(...params, cbName);
  }

  /**
   *
   * @param params
   * @private
   * @return {boolean} true, 兜底函数始终返回true, 保证异常任务不阻塞后续任务
   */
  static #defaultCallback(...params) {
    const cbName = params.pop();
    console.log(`timer-{${cbName}} run defaultCallback; params:${params}; tick: ${Game.time}`);
    return true;
  }
}

export class TimerManager {
  /**
   * timers: 保存所有的定时器，按照endTick排序
   */
  timers;

  constructor(timers) {
    this.timers = timers || [];
  }

  /**
   * 获取定时器管理器实例
   * @returns {TimerManager}
   */
  static getInstance() {
    return timerManager || new TimerManager(Memory.timers);
  }

  /**
   * 添加定时器
   * @param callback
   * @param delay
   * @param params
   */
  addTimer(callback, delay, params) {
    const timer = new Timer(this.timers.length, callback, delay, params);
    this.timers.push(timer);
    // TODO 使用优先队列优化
    this.timers.sort((a, b) => a.endTick - b.endTick);
    return timer.id;
  }

  removeTimer(id) {
    this.timers = this.timers.filter(timer => timer.id !== id);
  }

  getNext() {
    return this.timers[0];
  }

  shiftTimer() {
    this.timers.shift();
  }

  work() {
    const currentTick = Game.time;
    while (this.timers.length > 0 && this.timers[0].endTick <= currentTick) {
      const timer = this.getNext();
      if (Timer.run(timer)) {
        this.shiftTimer();
      }
    }
  }

}

/**
 * 放置在全局（会周期性执行），减少读取Memory次数
 */
  // TODO ? 验证是否有效
const timerManager = new TimerManager(Memory.timers);
