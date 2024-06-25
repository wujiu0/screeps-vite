import CreepUtil from './CreepUtil.js';
import RoomUtil from './RoomUtil.js';
import InfoUtil from './InfoUtil.js';

function initProto() {
  Game.creepUtil = CreepUtil;
  Game.roomUtil = RoomUtil;
  Game.infoUtil = InfoUtil;
}
