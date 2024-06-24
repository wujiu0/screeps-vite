export default {
  /**
   * 检查creep是否需要续命
   * @param {Creep} creep
   */
  checkLifeTime(creep) {

    // 如果是tmp Creep，不需要检查
    if (creep.memory.tmp) return;

    // 如果存活时间不足20，就开始续命
    // 注：判断条件不能设置为小于50，计数器会出现问题
    if (creep.ticksToLive && creep.ticksToLive === 50) {
      creep.say('🔄 renew');
      const spawn = Game.spawns[creep.memory.spawn];
      if (--spawn.memory.creepsStatus[creep.memory.role].count < 0) {
        spawn.memory.creepsStatus[creep.memory.role].count = 0;
      }
      // 传递重生者的序号
      console.log('renew', creep.name);
      spawn.memory.creepsStatus[creep.memory.role].next = creep.memory.num;
      // 不再设置自杀，只是更改计数器，通知spawn开始制造新的creep，然后等待自然死亡
      // creep.suicide();
    }
  },

  /**
   * 类型转化
   * @param {Creep} creep
   * @param {CreepType} targetType
   */
  convert(creep, targetType) {
    creep.memory.role = targetType.role;
  },

  /**
   * 采集能量
   * @param {Creep} creep
   * @param {Source} [source] 指定的source
   */
  harvest(creep, source) {

    if (!source) {
      const sources = creep.room.find(FIND_SOURCES);
      source = sources[creep.memory.group];
    }
    const res = creep.harvest(source);

    if (res === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    return res;
  },
  /**
   * 从建筑中获取能量
   * @param {Creep} creep
   * @param {Structure} src
   */
  takeOut(creep, src) {
    const res = creep.withdraw(src, RESOURCE_ENERGY);
    if (res === ERR_NOT_IN_RANGE) {
      creep.moveTo(src, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    return res;
  },

  /**
   * 捡取掉落能量
   * @param {Creep} creep
   * @param {Resource} source 掉落的能量源
   */
  pioneer(creep, source) {
    const res = creep.pickup(source);
    if (res === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, {visualizePathStyle: {stroke: '#d000ff'}});
    }
    return res;
  },
  /**
   * 输送能量
   * @param {Creep} creep
   * @param {StructureSpawn | StructureExtension | StructureContainer | StructureStorage | StructureTower} target
   */
  transfer(creep, target) {
    const res = creep.transfer(target, RESOURCE_ENERGY);
    if (res === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
    return res;
  },
};

/**
 * 获取此类型当前最高可用的构成
 * @param {CreepTypeNew} type
 * @param {number} energyCapacityAvailable
 * @returns {CreepType}
 */
export function getCurrentCreepBody(type, energyCapacityAvailable) {
  const {costs} = type;
  const result = new CreepType(type.role, [], 0);
  if (energyCapacityAvailable < costs[0]) {
    result.body = type[costs[0]];
    result.cost = costs[0];
  } else if (energyCapacityAvailable >= costs[costs.length - 1]) {
    result.body = type[costs[costs.length - 1]];
    result.cost = costs[costs.length - 1];
  } else {
    for (let i = 0; i < costs.length - 1; i++) {
      if (energyCapacityAvailable >= costs[i] && energyCapacityAvailable < costs[i + 1]) {
        result.body = type[costs[i]];
        result.cost = costs[i];
        break;
      }
    }
  }
  return result;
}
