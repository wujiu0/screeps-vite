import roomUtil from '../utils/RoomUtil.js';

export function towerWork() {

  /**
   *
   * @type {StructureLink}
   */
  const link_storage = Game.getObjectById('667fa4bdc4157c5b54fd4104');
  const link_controller = Game.getObjectById('667f9f3e3f1b7c5b54f9f3f4');
  if (tower) {
    // // console.log('wujiu:🚀🚀🚀~~~~~~~~tower-9-towerWork:~~~~~~ 300000000 === structure.hits', 300000000 === structure.hits)
    // const closestDamagedStructure = tower.pos.findInRange(FIND_STRUCTURES, 1000).filter(structure => structure.hits < structure.hitsMax);
    // if (closestDamagedStructure[0]) {
    //   tower.repair(closestDamagedStructure[0]);
    // }

    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      const structureWalls = roomUtil.findAllWallAndRampart(tower.room).filter(wall => wall.hits < 50 * 1000);
      if (structureWalls[0]) {
        tower.repair(structureWalls[structureWalls.length - 1]);
      }
    }

  }
}
