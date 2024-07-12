import core from '../common/core.js';
import creepUtil from '../utils/creepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    creepUtil.checkLifeTime(creep);
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }
    if (creep.memory.tmp) {
      this.tmpWork(creep);
      return;
    }
    // 如果处于building状态
    if (creep.memory.building) {

      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (!targets.length) {
        creep.moveTo(Game.flags['Waiting']);
        return;
      }
      // const targetIndex = 0;
      const targetIndex = targets.length - 1;
      if (creep.build(targets[targetIndex]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[targetIndex], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      // 如果地图上有掉落的资源，优先捡起来
      const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
      if (droppedResources.length > 0 && false) {
        creepUtil.pioneer(creep, droppedResources[0]);
      } else {
        // creepUtil.harvest(creep);
        // 当storage存在且可用能量 > 20K 后， 首先考虑从storage中获取能量
        const src = core.state.storage && core.state.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 20 * 1000 ?
          core.state.storage :
          RoomUtil.findAllContainer(creep.room)[2] ?? RoomUtil.findAllContainer(creep.room)[creep.memory.group];
        creepUtil.takeOut(creep, src);
      }
    }


  },
  /**
   *
   * @param{Creep} creep
   */
  tmpWork(creep) {
    !creep.pos.isEqualTo(24, 40) && creep.moveTo(24, 40);
    if (creep.memory.building) {
      const target = Game.getObjectById('6680c4139aadf94b80ad6e49');
      creep.build(target);
    } else {
      const storage = creep.room.storage;
      creepUtil.takeOut(creep, storage);
    }
  },
};
