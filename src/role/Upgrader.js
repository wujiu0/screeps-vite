import CreepUtil from '../utils/CreepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

/**
 * controller 升级者
 */
const Upgrader = {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    CreepUtil.checkLifeTime(creep);
    // creep.say('U');
    // 解锁第三个container，围绕其进行升级
    const flag = RoomUtil.findAllContainer(creep.room).length >= 3;

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
        if (flag) {
          creep.moveTo(RoomUtil.findAllContainer(creep.room)[2]);
          CreepUtil.takeOut(creep, RoomUtil.findAllContainer(creep.room)[2]);
          return;
        }
        CreepUtil.takeOut(creep, RoomUtil.findAllContainer(creep.room)[0] || RoomUtil.findHasEnergyStructure(creep.room)[0]);
      }
    })();
  },
};

export default Upgrader;

