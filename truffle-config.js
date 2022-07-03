module.exports = {
  contracts_build_directory: "./client/src/artifacts/",
  networks: {
    development: {
      host: process.env.HOST || "127.0.0.1",
      port: process.env.PORT || 8545,
      network_id: process.env.NETWORK_ID || "*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
