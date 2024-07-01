import creepUtil from '../utils/creepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';

/**
 * energy 采集收获者
 */
export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    creepUtil.checkLifeTime(creep);
    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
      creep.memory.harvesting = false;
      creep.say('👣 transfer');
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.harvesting = true;
      creep.say('🔄 harvest');
    }
    // 首先检查creep所处的房间是否正确，如果不正确，就移动到正确的房间
    if (creep.memory.room && creep.room.name !== creep.memory.room) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
      return;
    }
    // 先建造container之后才有打工人
    const allContainers = RoomUtil.findAllContainer(creep.room);
    if (!creep.store.getCapacity()) {
      // 身上没有空间，只需要走到container上持续打工
      creep.say('╰(*°▽°*)╯');
      // const sources = creep.room.find(FIND_SOURCES);
      const {group} = creep.memory;
      // this.staticHarvest(creep, sources[group], containers[group].pos);
      if (allContainers[group] && !creep.pos.isEqualTo(allContainers[group])) {
        creep.moveTo(allContainers[group]);
      } else {
        creepUtil.harvest(creep);
      }
    } else if (creep.memory.harvesting) {
      // creepUtil.harvest(creep, creep.room.find(FIND_SOURCES)[1]);
      creepUtil.harvest(creep);
    } else {
      // 身上有空间并且满了，去建筑里面放能量
      // creep.say('🚧 transfer');
      const targets = RoomUtil.findSurplusEnergyStructure(creep.room);
      if (targets.length > 0) {
        creepUtil.transfer(creep, targets[0]);
      }
    }
  },

  /**
   * 静态采集能量
   * @param {Creep} creep 采集者
   * @param {Source} source 能量源
   * @param {RoomPosition} workplace 工作地点
   */
  staticHarvest(creep, source, workplace) {
    creep.moveTo(workplace, {visualizePathStyle: {stroke: '#ffaa00'}});
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    }
  },

  /**
   * 采集能量
   * @param {Creep} creep 采集者
   * @param {Source} source 能量源
   */
  harvest(creep, source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  },

  /**
   * 输送能量
   * @param {Creep} creep
   * @param {StructureSpawn|StructureExtension} target
   */
  transfer(creep, target) {
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  },
};
