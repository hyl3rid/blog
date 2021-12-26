import { NextApiRequest, NextApiResponse } from "next";
const posts = require("../../cache/data").posts;

export default (req: NextApiRequest, res: NextApiResponse) => {
  const results = req.query.q
    ? posts.filter((post: any) =>
        post.title.toLowerCase().includes(req.query.q)
      )
    : [1];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
