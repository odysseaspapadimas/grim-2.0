import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      clientId:
        process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    maxAge: 15 * 24 * 60 * 60,
  },
};

export default (req, res) => NextAuth(req, res, options);
