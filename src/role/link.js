import roomUtil from '../utils/roomUtil.js';

//TODO 采用中央集权制度， 所有资源统一交由storage管理, 由storage分配给其他建筑
// {link_resource} -> {link_storage} -> {link_controller} > {tower} > {spawn, extension}
export function towerWork() {

  /**
   *
   * @type {StructureLink}
   */
  const link_storage = Game.getObjectById('667fa4bdc4157c5b54fd4104');
  const link_controller = Game.getObjectById('667f9f3e3f1b7c5b54f9f3f4');
  
  // stage 1: storage -> controller
  
}
