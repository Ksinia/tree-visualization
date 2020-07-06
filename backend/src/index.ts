import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");

const dbSession = require("./db.ts");

// Boot express
const app: Application = express();
const port = 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

// Application routing
app.use("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await dbSession.run(
      "match (n:Node) optional match (n:Node)-[r:PARENT]->(n2:Node) with n, [type(r), n2] as relative return { root: n, relatives: collect(relative) }"
      // "match (n:Node) optional match (n:Node)-[r:CHILD]->(n2:Node) with n, [type(r), n2] as child return { root: n, children: collect(child) }"
      // "match (n) optional match (n)-[r]->(n2) with n, [type(r), n2] as relative return { root: n, relatives: collect(relative) }"
      // "MATCH tree = (p:Node)-[:PARENT*1..5]->(c:Node) WHERE c.name = 'A' RETURN nodes(tree), relationships(tree), tree, length(tree), [n in nodes(tree) | n.name] as names"
    );
    const records = result.records;
    res.status(200).send(JSON.stringify(records));
  } catch (error) {
    console.log(error);
  }
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
