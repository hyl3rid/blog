import { NextApiRequest, NextApiResponse } from "next";
const posts = require("../../cache/data").posts;

export default (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.q;
  console.log(query);
  const results =
    query !== ""
      ? posts.filter((post: any) => post.title.toLowerCase().includes(query))
      : [];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
