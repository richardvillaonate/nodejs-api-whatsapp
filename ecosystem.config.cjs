module.exports = {
    apps : [{
      name: "app",
      script: "npx tsm./src/app.ts",
      watch:false,
      max_memory_restart:"1000M",
      exec_mode:"cluster",
      instances:1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }