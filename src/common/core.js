import creepUtil from '../utils/creepUtil.js';
import utils from '../utils/index.js';
import roomUtil from '../utils/roomUtil.js';
import config from './config.js';
import roleStrategies from '../role/roleStrategies.js';

export default {
  options: {},
  state: {},

  initState() {
    // TODO 检查是否触发多次调用
    const room = Game.rooms['W42S42'];
    const spawns = [Game.spawns['Spawn0']];
    this.state = {
      room,
      spawns,
      containers: roomUtil.findAllContainer(room),
      towers: roomUtil.findTowers(room),
      storage: room.storage || null,
      coreWorkPosition: new RoomPosition(26, 16, room.name),
      constructionSites: roomUtil.findConstructionSite(room),
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

    const {
      containers,
      towers,
      constructionSites,
    } = this.state;
    if (!containers.length) {
      config.SPAWN_MAX_CREEP_COUNT.repairer = 0;
    }
    if (towers.length >= 2) {
      config.SPAWN_MAX_CREEP_COUNT.repairer = 1;
    }
    if (constructionSites.length) {
      config.SPAWN_MAX_CREEP_COUNT.builder = 2;
      config.SPAWN_MAX_CREEP_COUNT.upgrader = 1;
    }
  },
  initUtils() {
    Game.utils = utils;
  },
  /**
   *
   * @param {roleType} role
   * @param {string} [room]
   */
  produceCreep(role, room) {
    creepUtil.produceCreep(role, room);
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
    } else if (builder.count < config.SPAWN_MAX_CREEP_COUNT.builder) {
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
