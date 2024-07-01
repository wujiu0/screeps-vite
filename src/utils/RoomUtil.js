import core from '../common/core.js';

export default {

  /**
   * 寻找所有的spawn和extension
   * @param {Room} room
   * @return {(StructureExtension| StructureSpawn)[]}
   */
  findAllEnergyStructure(room) {
    return room.find(FIND_MY_STRUCTURES)
      .filter((structure) => structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN);
  },
  /**
   * 寻找有空间的spawn和extension
   * @param {Room} room
   * @return {(StructureExtension | StructureSpawn)[]}
   */
  findSurplusEnergyStructure(room) {
    return this.findAllEnergyStructure(room)
      .filter((structure) => structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
  },
  /**
   * 寻找有能量的spawn和extension
   * @param {Room} room
   * @return {(StructureExtension | StructureSpawn)[]}
   */
  findHasEnergyStructure(room) {
    return this.findAllEnergyStructure(room)
      .filter((structure) => structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
  },

  /**
   * 寻找所有的container
   * @param {Room} room
   * @return {StructureContainer[]}
   */
  findAllContainer(room) {
    return room.find(FIND_STRUCTURES).filter((structure) => structure.structureType === STRUCTURE_CONTAINER);
  },

  /**
   * 寻找所有的road
   * @param {Room} room
   * @return {StructureRoad[]}
   */
  findAllRoad(room) {
    return room.find(FIND_STRUCTURES).filter((structure) => structure.structureType === STRUCTURE_ROAD);
  },
  /**
   * 寻找所有的wall
   * @param{Room} room
   * @returns {(StructureWall | StructureRampart)[]}
   */
  findAllWallAndRampart(room) {
    return room.find(FIND_STRUCTURES).filter((structure) => structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART);
  },
  /**
   * 寻找所有的constructionSite
   * @param{Room} room
   * @returns {ConstructionSite[]}
   */
  findConstructionSite(room) {
    return room.find(FIND_CONSTRUCTION_SITES);
  },

  /**
   * 获取房间中的可用的spawn
   *
   * 若都不可用，return the first of all spawns in this room
   *
   * @param{Room | string} room
   * @returns {StructureSpawn}
   */
  getAvailableSpawn(room) {
    room = this._normalizingRoom(room);
    const spawnsInCurrentRoom = core.state.spawns.filter(spawn => spawn.room.name === room.name);
    return spawnsInCurrentRoom.filter(spawn => !spawn.spawning)[0] || core.state.spawns[0];
  },

  _normalizingRoom(room) {
    if (!room) {
      room = core.state.room;
    }
    if(typeof room === 'string') {
      room = Game.rooms[room];
    }
    return room;
  }
};
