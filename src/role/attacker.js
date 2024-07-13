/**
 * attacker
 */
export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    const target = Game.getObjectById('667e85b049f46d0012d25cb1');

    // creep.moveTo(new RoomPosition(25, 25, 'W41S42'),{visualizePathStyle: {stroke: '#ff0000'}});
    if (creep.attack(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }

  },

};

