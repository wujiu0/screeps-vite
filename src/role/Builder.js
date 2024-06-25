import CreepUtil from '../utils/CreepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

const Builder = {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    CreepUtil.checkLifeTime(creep);
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    // 如果处于building状态
    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (!targets.length) {
        creep.moveTo(Game.flags['Builder']);
        return;
      }
      const targetIndex = 0;
      // const targetIndex = targets.length - 1;
      if (creep.build(targets[targetIndex]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[targetIndex], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      // 如果地图上有掉落的资源，优先捡起来
      const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
      if (droppedResources.length > 0) {
        CreepUtil.pioneer(creep, droppedResources[0]);
      } else {
        const ind = RoomUtil.findAllContainer(creep.room).length > 1 ? 1 : 0;
        CreepUtil.takeOut(creep, RoomUtil.findAllContainer(creep.room)[ind]);
      }
    }
  },
};

export default Builder;
