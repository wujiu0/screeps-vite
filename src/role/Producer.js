import config from '../config/config.js';
import { BUILDER, getCurrentCreepBody, HARVESTER, REPAIRER, TRANSPORTER, UPGRADER } from '../types/CreepType.js';
import RoomUtil from '../utils/RoomUtil.js';

const Producer = {
  /**
   *
   * @param {StructureSpawn} spawn
   * @param {roleType} typeNew
   * @param {string} [room]
   */
  produceCreep(spawn, typeNew, room) {

    const type = getCurrentCreepBody(typeNew, spawn.room.energyAvailable);
    console.log(`capacity:${spawn.room.energyCapacityAvailable},available:${spawn.room.energyAvailable},produce:${type.role}-${type.cost}`);
    if (spawn.room.energyAvailable >= type.cost && !spawn.spawning) {
      // 类型计数器++
      const lastId = spawn.memory.creepsStatus[type.role].count++;
      // 获取是否有重生者，如果没有，使用计数器中的id
      let {next} = spawn.memory.creepsStatus[type.role];
      if (next === -1) next = lastId;
      // 加时间戳防止重名导致无法建造
      const res = spawn.spawnCreep(type.body, type.role + '-' + next + '-' + Date.now(), {
        memory: {
          role: type.role,
          num: next,
          room: room || spawn.room.name,
          group: next % 2,
          spawn: spawn.name,
        },
      });

      spawn.room.visual.text(type.role + '-' + next, spawn.pos.x + 1, spawn.pos.y, {
        align: 'left',
        opacity: 0.8,
      });
      // 建造完成之后，序号置为-1，表示没有重生者
      spawn.memory.creepsStatus[type.role].next = -1;
      console.log(res);
      console.log('生产了一个' + type.role, '当前数量：', spawn.memory.creepsStatus[type.role].count);
    }
  },
  /**
   *
   * @param {StructureSpawn} spawn
   * @param {CreepTypeNew} typeNew
   * @param {string} [room]
   */
  produceCreepNew(spawn, typeNew, room) {
    this.produceCreep(spawn, typeNew, room);
  },

  /**
   *
   * @param {StructureSpawn} spawn
   */
  init(spawn) {
    if (!spawn.memory.initFlag) {
      spawn.memory.creepsStatus = config.SPAWN_INIT_CONFIG;
      spawn.memory.initFlag = true;
    }
    this.setConfig(spawn);
  },

  /**
   *
   * @param {StructureSpawn} spawn
   */
  setConfig(spawn) {
    const {
      harvester,
      transporter,
      upgrader,
      repairer,
      builder,
    } = spawn.memory.creepsStatus;

    // 优先级：harvester>transporter>upgrader>repairer>builder
    if (harvester.count < config.SPAWN_MAX_CREEP_COUNT.harvester) {
      Producer.produceCreep(spawn, 'HARVESTER');
    } else if (RoomUtil.findAllContainer(spawn.room).length > 0 && transporter.count < config.SPAWN_MAX_CREEP_COUNT.transporter) {
      Producer.produceCreepNew(spawn, '');
    } else if (upgrader.count < config.SPAWN_MAX_CREEP_COUNT.upgrader) {
      Producer.produceCreepNew(spawn, UPGRADER);
    } else if (repairer.count < config.SPAWN_MAX_CREEP_COUNT.repairer) {
      Producer.produceCreepNew(spawn, REPAIRER);
    } else if (builder.count < config.SPAWN_MAX_CREEP_COUNT.builder) {
      Producer.produceCreepNew(spawn, BUILDER);
    } else {
      console.log('nothing to do');
    }
  },
};

export default Producer;
