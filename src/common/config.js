const config = {
  SPAWN_INIT_CONFIG: {
    harvester: {
      count: 0,
      nextList: [],
    },
    transporter: {
      count: 0,
      nextList: [],
    },
    upgrader: {
      count: 0,
      nextList: [],
    },
    builder: {
      count: 0,
      nextList: [],
    },
    repairer: {
      count: 0,
      nextList: [],
    },
    communicator: {
      count: 0,
      nextList: [],
    },
    temp: {
      count: 0,
      nextList: [],
    },
  },
  SPAWN_MAX_CREEP_COUNT: {
    harvester: 2,
    upgrader: 1,
    transporter: 3,
    builder: 2,
    communicator: 1,
    temp: 99,
    repairer: 2,
  },
  WALL_MAX_HP_PERCENT: 0.03,
  LOG_LEVEL: 'info',
};

export default config;
