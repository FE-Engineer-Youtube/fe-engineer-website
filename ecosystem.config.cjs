module.exports = {
  apps : [{
    name: 'fe-cluster',
    script: 'pnpm',
    args: 'react-router-serve ./build/server/index.js',
    instances: 1,
    port: 3002,
    max_memory_restart: "500M",
    exec_mode: "cluster_mode",
    env: {
        NODE_ENV: "production",
    },
  }],
};
