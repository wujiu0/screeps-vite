//@ts-nocheck
interface CreepTypeNew {
  role: roleType;
  costs: number[];

  [index: number]: BodyPartConstant[];
}

type roleType = 'harvester' | 'transporter' | 'upgrader' | 'builder' | 'communicator' | 'repairer' | 'temp';

interface CreepMemory {
  /**
   * 角色
   */
  role: roleType;
  /**
   * 序号
   */
  num: number;
  /**
   * 分组
   */
  group: number;
  /**
   * 所属spawn
   */
  spawn: string;
  /**
   * 所处房间
   */
  room: string;
  /**
   * harvest状态
   */
  harvesting?: boolean;
  /**
   * upgrade状态
   */
  upgrading?: boolean;
  /**
   * build状态
   */
  building?: boolean;
  /**
   * transfer状态
   */
  transferring?: boolean;
  /**
   * repair状态
   */
  repairing?: boolean;
  /**
   * 临时creep
   */
  tmp?: boolean;
}

interface Memory {
  /**
   * 初始化标志
   */
  initFlag: boolean;
  /**
   * 调整配置标志
   */
  adjustFlag: boolean;
  /**
   * creeps状态
   */
  creepsStatus: {
    harvester: { count: number; nextList: Array<number> };
    transporter: { count: number; nextList: Array<number> };
    upgrader: { count: number; nextList: Array<number> };
    builder: { count: number; nextList: Array<number> };
    repairer: { count: number; nextList: Array<number> };
    communicator: { count: number; nextList: Array<number> };
    temp: { count: number; nextList: Array<number> };
  };
}
