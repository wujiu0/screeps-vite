import creepUtil from '../utils/creepUtil.js';
import InfoUtil from '../utils/InfoUtil.js';
import roomUtil from '../utils/RoomUtil.js';
import config from './config.js';
import { getCurrentCreepBody } from './CreepType.js';
import infoUtil from '../utils/InfoUtil.js';
import RoomUtil from '../utils/RoomUtil.js';
import roleStrategies from '../role/roleStrategies.js';

export default {
  options: {},
  state: {},

  initState() {
    const room = Game.rooms['W1N7'];
    this.state = {
      room,
      spawns: [Game.spawns['Spawn0'], Game.spawns['Spawn1']],
      towers: [Game.getObjectById('667fa4bdc4157c5b54fd4104'), Game.getObjectById('6680cc5163022f6d0884b68e'), Game.getObjectById('6681087ed0c20382ec2f9af9')],
      storage: room.storage,
      constructionSites: room.find(FIND_CONSTRUCTION_SITES),
    };
  },
  /**
   *
   * @param {StructureSpawn} spawn
   */
  initOptions(spawn) {
    if (!Memory.initFlag) {
      Memory.creepsStatus = config.SPAWN_INIT_CONFIG;
      Memory.initFlag = true;
    }

    const towers = [Game.getObjectById('667fa4bdc4157c5b54fd4104'), Game.getObjectById('6680cc5163022f6d0884b68e')];
    if (towers.length >= 2) {
      config.SPAWN_MAX_CREEP_COUNT.repairer = 1;
    }

  },
  initUtils() {
    Game.creepUtil = creepUtil;
    Game.roomUtil = RoomUtil;
    Game.infoUtil = InfoUtil;
  },
  /**
   *
   * @param {roleType} typeNew
   * @param {string} [room]
   */
  produceCreep(typeNew, room) {
    const spawn = roomUtil.getAvailableSpawn(room);
    const type = getCurrentCreepBody(typeNew, spawn.room.energyCapacityAvailable);
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
      Memory.creepsStatus[type.role].nextList = nextList.slice(1);
      Memory.creepsStatus[type.role].count++;
      console.log('生产了一个' + type.role, '当前数量：', Memory.creepsStatus[type.role].count);
    }
  },

  /**
   *
   * @param {StructureSpawn} spawn
   */
  setProductionRule(spawn) {
    const {
      harvester,
      transporter,
      upgrader,
      repairer,
      builder,
    } = Memory.creepsStatus;

    // 优先级：harvester>transporter>upgrader>repairer>builder
    if (harvester.count < config.SPAWN_MAX_CREEP_COUNT.harvester) {
      this.produceCreep('harvester');
    } else if (spawn.room.energyCapacityAvailable >= 650 && transporter.count < config.SPAWN_MAX_CREEP_COUNT.transporter) {
      this.produceCreep('transporter');
    } else if (upgrader.count < config.SPAWN_MAX_CREEP_COUNT.upgrader) {
      this.produceCreep('upgrader');
    } else if (repairer.count < config.SPAWN_MAX_CREEP_COUNT.repairer) {
      this.produceCreep('repairer');
    } else if (RoomUtil.findConstructionSite(spawn.room).length && builder.count < config.SPAWN_MAX_CREEP_COUNT.builder) {
      this.produceCreep('builder');
    } else {
      // console.log('nothing to do');
    }
  },

  setWorkRules() {
    for (let name in Game.creeps) {
      const creep = Game.creeps[name];
      const role = creep.memory.role;
      if (roleStrategies[role]) {
        roleStrategies[role].run(creep);
      } else {
        console.log(`ROLE_ERROR:${creep.name}, ${creep.memory.role} is not defined`);
      }
    }
  },
};
