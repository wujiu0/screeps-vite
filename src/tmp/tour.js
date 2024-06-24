Game.spawns['Spawn0'].room.controller.activateSafeMode();

// tour5: tower
const tower = Game.getObjectById('4ca328272db223b75db1a44f');
if (tower) {
  const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (structure) => structure.hits < structure.hitsMax,
  });
  if (closestDamagedStructure) {
    tower.repair(closestDamagedStructure);
  }

  var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
  }
}
