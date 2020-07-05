const neo4j = require("neo4j-driver");

const user = "neo4j";
const password = "test";
const uri = "neo4j://localhost";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session({
  database: "neo4j",
  defaultAccessMode: neo4j.session.WRITE,
});

module.exports = session;
