// 创建临时采集者
Game.spawns.Spawn0.spawnCreep(
  [WORK, WORK, CARRY, MOVE],
  'THarvester' + Date.now(),
  {
    memory: {
      role: 'harvester',
      num: 999,
      group: 0,
      tmp: true,
    },
  });
Game.spawns.Spawn0.spawnCreep(
  [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
  'THarvester',
  {
    memory: {
      role: 'harvester',
      num: 999,
      group: 0,
      tmp: true,
      room: 'W21N38',
    },
  });
// 创建临时运输者
Game.spawns.Spawn0.spawnCreep(
  [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
  'TTransporter' + Game.time,
  {
    memory: {
      role: 'transporter',
      num: 999,
      group: 0,
      tmp: true,
    },
  });
Game.spawns.Spawn0.spawnCreep(
  [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  'TTransporter' + Game.time,
  {
    memory: {
      role: 'transporter',
      num: 999,
      group: 0,
      tmp: true,
    },
  });
// 创建临时建造者
Game.spawns.Spawn0.spawnCreep(
  [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
  'TBuilder2',
  {
    memory: {
      role: 'builder',
      num: 999,
      group: 0,
      tmp: true,
    },
  });
// 创建临时升级者
Game.spawns.Spawn0.spawnCreep(
  [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
  'upgrader' + Game.time,
  {
    memory: {
      role: 'upgrader',
      num: 999,
      group: 0,
      tmp: true,
    },
  });
// 创建临时修复者
Game.spawns.Spawn0.spawnCreep(
  [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  'repairer' + Game.time,
  {
    memory: {
      role: 'repairer',
      num: 999,
      group: 1,
      room: 'W21N38',
      tmp: true,
    },
  },
);
//创建临时攻击者
Game.spawns.Spawn0.spawnCreep(
  [ATTACK, ATTACK, ATTACK, MOVE],
  'TAttacker',
  {
    memory: {
      role: 'attacker',
      num: 999,
      group: 1,
      tmp: true,
    }
  }
);
Game.getObjectById('64b19b83ae5199e68646efd1').room.find(FIND_HOSTILE_SPAWNS);
Game.getObjectById('64b19b83ae5199e68646efd1').attack(Game.getObjectById('64b19b83ae5199e68646efd1').room.find(FIND_HOSTILE_SPAWNS)[0]);


// 前往W21N38的采集者，采集能量并带回来
if (creep.name === 'TBuilder1') {
  if (creep.pos.roomName === 'W21N38') {
    const sources00 = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources00[creep.memory.group]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources00[creep.memory.group], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  } else {
    creep.moveTo(new RoomPosition(37, 48, 'W21N38'));
  }
}

// 创建临时房间预订者
Game.spawns.Spawn0.spawnCreep(
  [CLAIM,CLAIM, MOVE, MOVE],
  'TClaimer',
  {
    memory: {
      role: 'claimer',
      num: 999,
      group: 0,
      room: 'W41S42',
      tmp: true,
    },
  });

Game.spawns.Spawn0.spawnCreep(
  [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
  'TBuilder',
  {
    memory: {
      role: 'builder',
      num: 999,
      group: 0,
      tmp: true,
    },
  });
