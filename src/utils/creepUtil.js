import { getCurrentCreepBody } from '../common/CreepType.js';
import roleStrategies from '../role/roleStrategies.js';
import infoUtil from './infoUtil.js';
import roomUtil from './roomUtil.js';

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
      return ERR_INVALID_TARGET;
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

    // infoUtil.log(creep, 'transfer', res);
    return res;
  },
  /**
   *
   * @param {roleType} role
   * @param {string} [room]
   * @param {boolean} [tmp] 是否为临时creep
   */
  produceCreep(role, room, tmp = false) {
    const spawn = roomUtil.getAvailableSpawn(room);
    const type = getCurrentCreepBody(role, spawn.room.energyCapacityAvailable);
    console.log(`capacity:${spawn.room.energyCapacityAvailable},available:${spawn.room.energyAvailable},produce:${type.role}-${type.cost}`);
    if (spawn.room.energyAvailable >= type.cost && !spawn.spawning) {
      // 类型计数器++
      const lastId = Memory.creepsStatus[type.role].count;
      // 获取是否有重生者，如果没有，使用计数器中的id
      let {nextList} = Memory.creepsStatus[type.role];
      const nextId = !nextList || !nextList.length ? lastId : nextList[0];
      // 加时间戳防止重名导致无法建造
      const res = spawn.spawnCreep(type.body, type.role + '-' + nextId + '-' + Date.now(), {
        memory: {
          role: type.role,
          num: nextId,
          room: room || spawn.room.name,
          group: nextId % 2,
          tmp,
        },
      });

      spawn.room.visual.text(type.role + '-' + nextId, spawn.pos.x + 1, spawn.pos.y, {
        align: 'left',
        opacity: 0.8,
      });
      if (res !== 0) {
        console.log('PRODUCE_ERROR:', res, infoUtil.errorMap(res));
        return;
      }
      // 建造完成之后，序号置为-1，表示没有重生者
      Memory.creepsStatus[type.role].nextList = nextList?.slice(1) || [];
      Memory.creepsStatus[type.role].count++;
      console.log('生产了一个' + type.role, '当前数量：', Memory.creepsStatus[type.role].count);
    }
  },

  /**
   * produce a tmp creep
   * @param role
   * @param room
   */
  produceTCreep(role, room) {
    this.produceCreep(role, room, true);
  }
};
