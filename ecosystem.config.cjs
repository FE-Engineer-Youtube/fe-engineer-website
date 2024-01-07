module.exports = {
  apps : [{
    name: 'fe-cluster',
    script: 'pnpm',
    args: 'remix-serve ./build/index.js',
    instances: 4,
    port: 3003,
    max_memory_restart: "500M",
    exec_mode: "cluster_mode",
    env: {
        NODE_ENV: "production",
    },
  }],
};
