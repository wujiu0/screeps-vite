import core from './common/core.js';
import { towerWork } from './role/tower.js';

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
    core.initState();
    core.initUtils();
    core.initOptions(Spawn0);

    // 设置spawn生产规则
    core.setProductionRule(Spawn0);

    // 设置creeps工作规则
    core.setWorkRules();

    towerWork();

  },
};
export default main;
