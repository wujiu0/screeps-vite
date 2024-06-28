const config = {
  SPAWN_INIT_CONFIG: {
    harvester: {
      count: 0,
      next: 0,
    },
    transporter: {
      count: 0,
      next: 0,
    },
    upgrader: {
      count: 0,
      next: 0,
    },
    builder: {
      count: 0,
      next: 0,
    },
    repairer: {
      count: 0,
      next: 0,
    },
    communicator: {
      count: 0,
      next: 0,
    },
    temp: {
      count: 0,
      next: 0,
    },
  },
  SPAWN_MAX_CREEP_COUNT: {
    harvester: 3,
    upgrader: 2,
    transporter: 2,
    builder: 2,
    communicator: 1,
    temp: 99,
    repairer: 0,
  },

  LOG_LEVEL: 'info',
};

export default config;
