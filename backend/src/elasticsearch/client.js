const { Client } = require("@elastic/elasticsearch");
const config = require("config");

const elasticConfig = config.get("elastic");

const client = new Client({
    cloud: {
        id: elasticConfig.cloudID,
    },

    auth: {
        username: elasticConfig.username,
        password: elasticConfig.password,
    },
});

client.ping()
    .then(() => {
        console.log("Elasticsearch client is connected");
    }).catch((err) => {
        console.error("Elasticsearch client connection failed", err);
    });

module.exports = client;
