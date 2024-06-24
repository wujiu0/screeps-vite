/**
 * 采集者
 * @type {CreepTypeNew}
 */
export const HARVESTER = {
  role: 'HARVESTER',
  costs: [300, 450, 650],
  300: [WORK, CARRY, CARRY, MOVE, MOVE],
  450: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
  650: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const UPGRADER = {
  role: 'UPGRADER',
  costs: [300, 550, 750],
  300: [WORK, WORK, CARRY, MOVE],
  550: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  750: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const BUILDER = {
  role: 'BUILDER',
  costs: [300, 400, 750],
  300: [WORK, CARRY, MOVE, CARRY, MOVE],
  400: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
  750: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const COMMUNICATOR = {
  role: 'COMMUNICATOR',
  costs: [300],
  50: [MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const TRANSPORTER = {
  role: 'TRANSPORTER',
  costs: [300, 500, 650],
  300: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
  500: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
  650: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
};

/**
 *
 * @type {CreepTypeNew}
 */
export const REPAIRER = {
  role: 'REPAIRER',
  costs: [300, 500],
  500: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
};
/**
 * 临时
 * @type {CreepTypeNew}
 */
export const TEMP = {
  role: 'TEMP',
  costs: [200],
  200: [WORK, CARRY, MOVE],
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


export default class CreepType {
  /**
   * @param {string} role - The role of the creep
   * @param {BodyPartConstant[]} body - The body parts of the creep
   * @param {number} cost - The cost of the creep
   */
  constructor(role, body, cost) {
    this.role = role;
    this.body = body;
    this.cost = cost;
  }
}

