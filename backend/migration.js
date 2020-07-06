const data = [
  {
    name: "A",
    description: "This is a description of A",
    parentId: "",
  },
  {
    name: "B",
    description: "This is a description of B",
    parent: "A",
  },
  {
    name: "C",
    description: "This is a description of C",
    parent: "A",
  },
  {
    name: "D",
    description: "This is a description of D",
    parent: "A",
  },
  {
    name: "B-1",
    description: "This is a description of B-1",
    parent: "B",
  },
  {
    name: "B-2",
    description: "This is a description of B-2",
    parent: "B",
  },
  {
    name: "B-3",
    description: "This is a description of B-3",
    parent: "B",
  },
];

const neo4j = require("neo4j-driver");

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
          // query.relations.push(
          //   `(a${data.findIndex(
          //     (el) => el.name === datum.parent
          //   )})-[:CHILD]->(a${index})`
          // );
          query.relations.push(
            `(a${index})-[:PARENT]->(a${data.findIndex(
              (el) => el.name === datum.parent
            )})`
          );
        }
      });
      await session.run(
        `CREATE ${query.nodes.join(",")},${query.relations.join(",")}`
      );
    }
  } finally {
    await session.close();
  }
  // on application exit:
  await driver.close();
};

migrate();
