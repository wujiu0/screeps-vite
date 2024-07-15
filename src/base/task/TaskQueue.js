export default class TaskQueue {
  constructor() {
    /**
     * @type {Task[]}
     */
    this.queue = [];
  }

  /**
   *
   * @param {Function} fn
   */
  addTask(fn) {
    const task = new Task(fn);
    this.queue.push(task);
    return this;
  }

  /**
   * @returns {Task | undefined}
   */
  removeTask() {
    return this.queue.shift();
  }

  runTask() {
    if (this.queue.length > 0) {
      this.queue[0].run();
    }
  }
}

class Task {
  /**
   * @param {Function} fn
   */
  constructor(fn) {
    this.fn = fn;
  }

  run() {
    this.fn();
  }
}
