module.exports = {
    apps: [
      {
        name: "Vbooking",
        script: "vindo-crm.js",
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          name: "vbooking-test",
          NODE_ENV: "development",
          PORT: 9767 // Default to port 3000 for dev
        },
        env_production: {
          name: "vbooking-prod",
          NODE_ENV: "production",
          PORT: 9766 // Default to port 4000 for master
        }
      }
    ]
  };
  