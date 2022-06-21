import { NextApiRequest, NextApiResponse } from "next";
const posts = require("../../cache/data").posts;

export default (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.q;
  const results =
    query !== ""
      ? posts.filter((post: any) => {
          let titlesFound = post.title.toLowerCase().includes(query);
          let tagsFound = post.tag.some((i: any) => {
            return i.includes(query);
          });
          return titlesFound || tagsFound;
        })
      : [];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
