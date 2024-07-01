// tip: WORK尽量为CARRY的倍数
const creepTypeConfig = {
  /**
   * 采集者
   */
  HARVESTER: {
    role: 'harvester',
    costs: [300, 450, 500, 650],
    300: [WORK, CARRY, CARRY, MOVE, MOVE],
    450: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
    500: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    650: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
  },
  UPGRADER: {
    role: 'upgrader',
    costs: [300, 500, 750, 1150],
    300: [WORK, WORK, CARRY, MOVE],
    500: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    750: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    1150: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
  },
  BUILDER: {
    role: 'builder',
    costs: [300, 400, 700],
    300: [WORK, CARRY, MOVE, CARRY, MOVE],
    400: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
    700: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  },
  COMMUNICATOR: {
    role: 'communicator',
    costs: [300],
    50: [MOVE],
  },
  TRANSPORTER: {
    role: 'transporter',
    costs: [300, 500, 650, 800],
    300: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    500: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    650: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    800: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  },
  REPAIRER: {
    role: 'repairer',
    costs: [450, 600],
    450: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
    600: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
  },
  TEMP: {
    role: 'temp',
    costs: [200],
    200: [WORK, CARRY, MOVE],
  },
};

/**
 * 获取此类型当前最高可用的构成
 * @param {roleType} role
 * @param {number} energyCapacityAvailable
 * @returns {CreepType}
 */
export function getCurrentCreepBody(role, energyCapacityAvailable) {
  const type = creepTypeConfig[role.toUpperCase()];
  const {costs} = type;
  const result = new CreepType(role);
  if (energyCapacityAvailable >= costs[costs.length - 1]) {
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


export default class CreepType {
  /**
   * @param {roleType} role - The role of the creep
   * @param {BodyPartConstant[]} body - The body parts of the creep
   * @param {number} cost - The cost of the creep
   */
  constructor(role, body = [], cost = 0) {
    this.role = role;
    this.body = body;
    this.cost = cost;
  }
}

