/**
 * 采集者
 * @type {CreepTypeNew}
 */
export const HARVESTER = {
  role: 'harvester',
  costs: [300, 450, 650],
  300: [WORK, CARRY, CARRY, MOVE, MOVE],
  450: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
  650: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const UPGRADER = {
  role: 'upgrader',
  costs: [300, 550, 750],
  300: [WORK, WORK, CARRY, MOVE],
  550: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  750: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const BUILDER = {
  role: 'builder',
  costs: [300, 400, 750],
  300: [WORK, CARRY, MOVE, CARRY, MOVE],
  400: [WORK, WORK, CARRY, MOVE, CARRY, MOVE],
  750: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const COMMUNICATOR = {
  role: 'communicator',
  costs: [300],
  50: [MOVE],
};
/**
 * @type {CreepTypeNew}
 */
export const TRANSPORTER = {
  role: 'transporter',
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
  role: 'repairer',
  costs: [300, 500],
  500: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
};
/**
 * 临时
 * @type {CreepTypeNew}
 */
export const TEMP = {
  role: 'temp',
  costs: [200],
  200: [WORK, CARRY, MOVE],
};


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

export const CREEP_TYPES = {
  HARVESTER,
  UPGRADER,
  BUILDER,
  COMMUNICATOR,
  TRANSPORTER,
  REPAIRER,
  TEMP,
  getCurrentCreepBody,
};
