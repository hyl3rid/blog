import { NextResponse } from "next/server";

const Middleware = (req: any) => {
  for (let key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  NextResponse.next();
};

export default Middleware;
