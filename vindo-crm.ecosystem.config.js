module.exports = {
    apps: [
      {
        name: "Vindo Crm",
        script: "vindo-crm.js",
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          name: "vindo-crm-test",
          NODE_ENV: "development",
          PORT: 9761 // Default to port 3000 for dev
        },
        env_production: {
          name: "vindo-crm-prod",
          NODE_ENV: "production",
          PORT: 9760 // Default to port 4000 for master
        }
      }
    ]
  };
  