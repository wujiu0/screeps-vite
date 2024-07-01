import creepUtil from '../utils/creepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    // 检测存活时间
    creepUtil.checkLifeTime(creep);

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
    const roads = RoomUtil.findAllRoad(creep.room)
      .filter((road) => road.hits < road.hitsMax * 0.7)
      .sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);


    const targets = containers.concat(roads);
    creep.say('R: ' + targets.length);
    if (creep.memory.repairing) {
      //TODO 首先检查creep所处的房间是否正确，如果不正确，就移动到正确的房间（只有在工作时，获取能量还是在主房间）

      // 如果没有需要修理的container/road，就去flag处等待
      if (targets.length === 0) {
        creep.moveTo(Game.flags['Waiting']);
        return;
      }
      if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {

      const source = RoomUtil.findAllContainer(creep.room).length > 0 && creep.room.energyCapacityAvailable >= 650 ? RoomUtil.findAllContainer(creep.room)[0] : RoomUtil.findHasEnergyStructure(creep.room)[0];
      creepUtil.takeOut(creep, source);
    }
  },

};

