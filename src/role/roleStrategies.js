// 定义所有策略对象
import attacker from './attacker.js';
import builder from './builder.js';
import claimer from './claimer.js';
import communicator from './communicator.js';
import harvester from './harvester.js';
import repairer from './repairer.js';
import transporter from './transporter.js';
import upgrader from './upgrader.js';

export default {
  harvester,
  upgrader,
  builder,
  repairer,
  transporter,
  communicator,
  attacker,
  claimer
};
