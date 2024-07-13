import core from '../common/core.js';
import creepUtil from '../utils/creepUtil.js';
import roomUtil from '../utils/roomUtil.js';

/**
 * energy 运输者
 *  这里采取优先输送原则，当身上有能量时，优先输送能量，当身上没有能量时，再去获取能量
 */
export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    creepUtil.checkLifeTime(creep);
    creep.say('T');
    // 改变状态
    if (creep.memory.transferring && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.transferring = false;
      creep.say('🔄takeUp');
    }
    if (!creep.memory.transferring && creep.store.getFreeCapacity() === 0) {
      creep.memory.transferring = true;
      creep.say('✅transfer');
    }

    /**
     * @type {StructureTower}
     */
    const towers = core.state.towers;
    const containers = roomUtil.findAllContainer(creep.room);
    let res = 999;
    if (creep.memory.transferring) {
      // 优先从container【0】中取出能量输送给spawn或者extension
      const spawnAndExtensions = roomUtil.findSurplusEnergyStructure(creep.room);
      if (creep.store.getUsedCapacity() - creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        // 如果有其他资源，优先存储其他资源
        for (const resourceType in creep.store) {
          creepUtil.transfer(creep, core.state.storage, resourceType);
        }
        return;
      }
      if (spawnAndExtensions.length > 0) {
        const targetIndex = creep.memory.group ? spawnAndExtensions.length - 1 : 0;
        res = creepUtil.transfer(creep, spawnAndExtensions[targetIndex]);
      } else if (towers[0]?.store.getFreeCapacity(RESOURCE_ENERGY) >= 500) {
        // TODO 临时塔(全能)
        res = creepUtil.transfer(creep, towers[0]);
      } else if (towers[1]?.store.getFreeCapacity(RESOURCE_ENERGY) >= 500) {
        // TODO 临时塔（维护）
        res = creepUtil.transfer(creep, towers[1]);
      } else if (towers[2]?.store.getFreeCapacity(RESOURCE_ENERGY) >= 500) {
        // TODO 临时塔2（维护）
        res = creepUtil.transfer(creep, towers[2]);
      } else if (containers[2]?.store.getFreeCapacity() >= 200) {
        // 如果spawn或者extension都已满，则将能量存储到container【2】中
        res = creepUtil.transfer(creep, containers[2]);
      } else if (creep.room.storage) {
        // 如果container都满了，则将能量存储到storage中
        res = creepUtil.transfer(creep, creep.room.storage);
      }
      // infoUtil.log(creep, 'transfer', res);

    } else {
      // 如果地图上有掉落的资源，优先捡起来
      const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES).filter(resource => resource.resourceType === RESOURCE_ENERGY && resource.amount > 300 || resource.resourceType !== RESOURCE_ENERGY);
      if (droppedResources.length > 0) {
        creepUtil.pioneer(creep, droppedResources[0]);
      } else {
        // 从container中取出能量
        creepUtil.takeOut(creep, containers[creep.memory.group]);
      }
    }
  },

};
