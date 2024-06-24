export default {

  /**
   * 寻找所有的spawn和extension
   * @param {Room} room
   * @return {StructureExtension[] | StructureSpawn[]}
   */
  findAllEnergyStructure(room) {
    return room.find(FIND_MY_STRUCTURES)
      .filter((structure) => {
        return structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN;
      });
  },
  /**
   * 寻找有空间的spawn和extension
   * @param {Room} room
   * @return {StructureExtension[] | StructureSpawn[]}
   */
  findSurplusEnergyStructure(room) {
    return this.findAllEnergyStructure(room)
      .filter((structure) => {
        return (structure).store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      });
  },
  /**
   * 寻找有能量的spawn和extension
   * @param {Room} room
   * @return {StructureExtension[] | StructureSpawn[]}
   */
  findHasEnergyStructure(room) {
    return this.findAllEnergyStructure(room)
      .filter((structure) => {
          return (structure).store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        },
      );
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
   * @return {StructureRoad}
   */
  findAllRoad(room) {
    return room.find(FIND_STRUCTURES).filter((structure) => structure.structureType === STRUCTURE_ROAD);
  },
};
