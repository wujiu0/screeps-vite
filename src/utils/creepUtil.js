export default {
  /**
   * 检查creep是否需要续命
   * @param {Creep} creep
   */
  checkLifeTime(creep) {

    // 如果是tmp Creep，不需要检查
    if (creep.memory.tmp) return;

    // 如果存活时间不足20，就开始续命
    // 注：判断条件不能设置为【小于】50，计数器会出现问题
    if (creep.ticksToLive && creep.ticksToLive === 50) {
      creep.say('🔄 renew');
      const spawn = Game.spawns[creep.memory.spawn];
      if (--Memory.creepsStatus[creep.memory.role].count < 0) {
        Memory.creepsStatus[creep.memory.role].count = 0;
      }
      // 传递重生者的序号
      console.log('renew', creep.name);
      Memory.creepsStatus[creep.memory.role].nextList.push(creep.memory.num);
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
    if (!src) {
      this.harvest(creep);
    }
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
   * @param {ResourceConstant} [resourceType]
   * @return {number}
   */
  transfer(creep, target, resourceType = RESOURCE_ENERGY) {
    const res = creep.transfer(target, resourceType);
    if (res === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
    return res;
  },
};
