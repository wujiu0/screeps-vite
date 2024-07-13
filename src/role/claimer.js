/**
 * claimer
 */
export default {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    if(creep.room.name !== creep.memory.room){
      creep.moveTo(new RoomPosition(0,0, creep.memory.room),{visualizePathStyle: {stroke: '#ff0000'}});
      return;
    }
    // A room is visible if you have a creep or an owned structure in it.
    const targetRoom = Game.rooms[creep.memory.room];
    const target = targetRoom.controller;
    const res = creep.claimController(target);
    if (res === 0) {
      return;
    }
    console.log('wujiu:🚀~~~~~~~~claimer-20-run:~~~~~~ claim:', res)
    if(res === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    } else if (res === ERR_INVALID_TARGET) {
      const res = creep.attackController(target);
      console.log('wujiu:🚀🚀🚀~~~~~~~~claimer-25-run:~~~~~~ attack:', res)
    }

  },

};

