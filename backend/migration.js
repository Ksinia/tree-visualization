const neo4j = require("neo4j-driver");

const { data } = require("./data.json");

const user = "neo4j";
const password = "test";
const uri = "neo4j://localhost";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session({
  database: "neo4j",
  defaultAccessMode: neo4j.session.WRITE,
});

const migrate = async () => {
  try {
    const result = await session.run("MATCH (n) RETURN n");
    const records = result.records;
    if (records.length === 0) {
      const query = {
        nodes: [],
        relations: [],
      };
      data.forEach((datum, index) => {
        query.nodes.push(
          `(a${index}:Node {name: "${datum.name}", description: "${datum.description}"})`
        );
        if (datum.parent) {
          query.relations.push(
            `(a${index})-[:CHILD_OF]->(a${data.findIndex(
              (el) => el.name === datum.parent
            )})`
          );
        }
      });
      await session.run(
        `CREATE ${query.nodes.join(",")},${query.relations.join(",")}`
      );
      console.log("Records created");
    } else {
      console.log("Database is not empty");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await session.close();
  }
  await driver.close();
};

migrate();
