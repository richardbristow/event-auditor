require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'event-auditor-backend',
      script: 'src/api/server.js',
      watch: true,
      instances: -1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'event-auditor-front-end',
      script: 'npx',
      args: `serve -s build -l ${process.env.SERVE_PORT}`,
      interpreter: 'none',
      watch: true,
      instances: -1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
