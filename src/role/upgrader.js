import creepUtil from '../utils/creepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

/**
 * controller 升级者
 */
export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    creepUtil.checkLifeTime(creep);
    // creep.say('U');

    // 更改状态
    (function () {
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        // creep.say(creep.name.substring(creep.name.length - 1) + '🔄');
      }
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        // creep.say(creep.name.substring(creep.name.length - 1) + '⚡');
      }
    })();
    // 根据状态开始work
    if (creep.memory.upgrading) {
      if (!creep.room.controller) {
        console.error('no controller exist');
        return;
      }
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      if (RoomUtil.findAllContainer(creep.room).length >= 3) {
        this.checkWorkPos(creep);
        // const pos = RoomUtil.findAllContainer(creep.room)[2].pos;
        creepUtil.takeOut(creep, RoomUtil.findAllContainer(creep.room)[2]);
      } else {
        creepUtil.takeOut(creep, RoomUtil.findAllContainer(creep.room)[0]);
      }
    }

  },
  /**
   * 检查工作位置
   * @param{Creep} creep
   */
  checkWorkPos(creep) {
    if (RoomUtil.findAllContainer(creep.room).length >= 3){
      !creep.pos.isNearTo(creep.room.controller) && creep.moveTo(creep.room.controller);
    }
  },
};

