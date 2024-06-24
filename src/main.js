import Producer from './role/Producer.js';
import roleStrategies from './role/roleStrategies.js';

const main = {
  loop() {
    // 清理不存在的creep Memory
    for (let name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    // 初始化spawn
    const Spawn0 = Game.spawns['Spawn0'];
    Producer.init(Spawn0);

    // 设置spawn生产规则
    Producer.setConfig(Spawn0);

    // 设置creep工作规则
    for (let name in Game.creeps) {
      const creep = Game.creeps[name];
      const role = creep.memory.role;
      if (roleStrategies[role]) {
        roleStrategies[role].run(creep);
      } else {
        console.log(`${creep.name}, ${creep.memory.role} is not defined`);
      }
    }
  },
};
export default main;
