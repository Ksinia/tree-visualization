export type NodeType = {
  name: string;
  description: string;
  child_of?: [Node];
  _type: string;
  _id: { low: number; high: number };
};
