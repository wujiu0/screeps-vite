import core from '../common/core.js';
import creepUtil from '../utils/creepUtil.js';
// TODO 新增中央资源分配者
export default {
  /**
   * @param {Creep} creep -allocator
   */
  run(creep) {
    creepUtil.checkLifeTime(creep);

    this.checkWorkPos(creep);
    // 1. 能量供给link_controller
    // 2.
  },

  /**
   * 检查creep工作位置是否正确，如果不正确，就移动到正确的位置
   * @param creep
   * @returns {boolean} 是否在工作位置
   */
  checkWorkPos(creep) {
    const coreWorkPosition = core.state.coreWorkPosition;
    if (!creep.pos.isEqualTo(coreWorkPosition)) {
      creep.moveTo(coreWorkPosition);
      return false;
    }
    return true;
  },
};
