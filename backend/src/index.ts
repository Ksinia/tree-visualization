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
      "MATCH (n) WHERE NOT (:Node)<-[:CHILD_OF]-(n) MATCH path = (n)-[:CHILD_OF*]-(:Node) WITH collect(path) as paths CALL apoc.convert.toTree(paths) yield value RETURN value;"
    );
    const trees = result.records.map(
      (record: { _fields: Object[] }) => record._fields[0]
    );
    res.json(trees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
