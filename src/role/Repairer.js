import CreepUtil from '../utils/CreepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

const Repairer = {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    // 检测存活时间
    CreepUtil.checkLifeTime(creep);

    creep.say('R');
    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.repairing = false;
      creep.say('🔄harvest');
    }
    if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
      creep.memory.repairing = true;
      creep.say('🛠️repair');
    }
    /**
     *
     * @type {Structure[]}
     */
    const containers = RoomUtil.findAllContainer(creep.room).filter((container) => {
      return container.hits < container.hitsMax * 0.8;
    });
    const roads = RoomUtil.findAllRoad(creep.room).filter((road) => {
      return road.hits < road.hitsMax * 0.7;
    });


    const targets = containers.concat(roads);

    if (creep.memory.repairing) {
      // 首先检查creep所处的房间是否正确，如果不正确，就移动到正确的房间（只有在工作时，获取能量还是在主房间）
      if (creep.memory.room && creep.room.name !== creep.memory.room) {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
        return;
      }
      // 如果没有需要修理的container，就去flag处等待
      if (targets.length === 0) {
        creep.moveTo(Game.flags['Repairer']);
        return;
      }
      if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      if (creep.memory.room && creep.room.name === creep.memory.room) {
        creep.moveTo(new RoomPosition(25, 25, 'W21N37'));
        return;
      }
      const ind = RoomUtil.findAllContainer(creep.room).length > 1 ? 1 : 0;
      CreepUtil.takeOut(creep, RoomUtil.findAllContainer(creep.room)[ind]);
    }
  },

};


export default Repairer;
