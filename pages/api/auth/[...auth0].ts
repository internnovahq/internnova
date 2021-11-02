import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

/* eslint-disable */
//@ts-ignore
const afterCallback = async (req, res, session, state) => {
  try {
    if (session.user) {
      const user = {
        id: session.user.sub,
        name: session.user.name as string,
        email: session.user.email as string,
        picture:
          (session.user.picture as string) ||
          "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
      };
      return user;
    }
    throw new Error("No user in session");
  } catch {}
  return session;
};

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    await handleCallback(req, res, { afterCallback });
  },
});
