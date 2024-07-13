import core from '../common/core.js';
import roomUtil from '../utils/roomUtil.js';
import roomUtil from '../utils/roomUtil.js';

export function towerWork() {

  /**
   *
   * @type {StructureTower[]}
   */
  const towers = core.state.towers;
  if (!towers.length) return;
  const closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (towers[0]) {
    if (closestHostile) {
      towers[0].attack(closestHostile);
    } else {
      const structureWalls = getRepairTargets(towers[0]);
      if (structureWalls[0]) {
        towers[0].repair(structureWalls[0]);
      }
    }

  }
  if (towers[1] || towers[2]) {
    if (closestHostile) {
      towers[0].attack(closestHostile);
      return;
    }
    const structureWalls = roomUtil.findAllWallAndRampart(towers[1].room)
      .filter(wall => wall.hits < 1000 * 1000)
      .sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
    const containers = roomUtil.findAllContainer(towers[1].room).filter(container => container.hits < container.hitsMax * 0.8)
      .sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
    const roads = roomUtil.findAllRoad(towers[1].room)
      .filter((road) => road.hits < road.hitsMax * 0.7)
      .sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);


    const targets = [...structureWalls, ...containers, ...roads];
    if (targets[0]) {
      towers[1] && towers[1].repair(targets[0]);
      towers[2] && towers[2].repair(targets[0]);
    }
  }
}

function getRepairTargets(tower) {
  const allWallAndRampart = roomUtil.findAllWallAndRampart(tower.room);
  const lowHits = allWallAndRampart.filter(wall => wall.hits < 1000 * 1000);

  if (core.state.constructionSites.length) {
    return lowHits.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
  }
  return (lowHits.length ? lowHits : allWallAndRampart.filter(wall => wall.hits < 1.5 * 1000 * 1000) || [])
    .sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
}
