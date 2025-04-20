module.exports = {
    apps: [
      {
        name: "Vibein",
        script: "vindo-crm.js",
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          name: "vibein-test",
          NODE_ENV: "development",
          PORT: 9769 // Default to port 3000 for dev
        },
        env_production: {
          name: "vibein-prod",
          NODE_ENV: "production",
          PORT: 9768 // Default to port 4000 for master
        }
      }
    ]
  };
  