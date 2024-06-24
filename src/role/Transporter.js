import CreepUtil from '../utils/CreepUtil.js';
import RoomUtil from '../utils/RoomUtil.js';
import InfoUtil from '../utils/InfoUtil.js';

/**
 * energy 运输者
 *  这里采取优先输送原则，当身上有能量时，优先输送能量，当身上没有能量时，再去获取能量
 */
export default {
  run(creep: Creep) {
    CreepUtil.checkLifeTime(creep);
    creep.say('T');
    // 改变状态
    if (creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.transferring = false;
      creep.say('🔄takeUp');
    }
    if (!creep.memory.transferring && creep.store.getFreeCapacity() == 0) {
      creep.memory.transferring = true;
      creep.say('✅transfer');
    }


    const containers = RoomUtil.findAllContainer(creep.room);
    let res = 999;
    if (creep.memory.transferring) {
      // 优先从container【0】中取出能量输送给spawn或者extension
      const spawnAndExtensions = RoomUtil.findSurplusEnergyStructure(creep.room);
      if (spawnAndExtensions.length > 0) {
        res = CreepUtil.transfer(creep, spawnAndExtensions[0]);
      } else if (containers[1].store.getFreeCapacity() > 0) {
        // 如果spawn或者extension都已满，则将能量存储到container【1】中
        res = CreepUtil.transfer(creep, containers[1]);
      } else if (creep.room.storage) {
        // 如果container【1】也满了，则将能量存储到storage中
        res = CreepUtil.transfer(creep, creep.room.storage);
      }
      InfoUtil.log(creep, 'transfer', res);

    } else {
      // 首先检查creep所处的房间是否正确，如果不正确，就移动到正确的房间
      // (运输者搬运能量时需要回到主房间，所以只在非transferring时检查)
      if (creep.memory.room && creep.room.name !== creep.memory.room) {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
        return;
      }
      // 如果地图上有掉落的资源，优先捡起来
      const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
      if (droppedResources.length > 0) {
        CreepUtil.pioneer(creep, droppedResources[0]);
      } else {
        // 搬运能量需要回到主房间
        if (creep.memory.room && creep.room.name !== creep.memory.room) {
          creep.moveTo(new RoomPosition(25, 25, 'W21N37'));
          return;
        }
        // 从container中取出能量
        CreepUtil.takeOut(creep, containers[0]);
      }
    }
  },

};
