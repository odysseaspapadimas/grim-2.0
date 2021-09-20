import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      clientId:
        "924088467564-dvg5vaqm4kv0t8g1fb1t0ea2tle1oscq.apps.googleusercontent.com",
      clientSecret: "0BWDIh9btZJUUDVye6ytt2ds",
    }),
  ],
  session: {
    maxAge: 15 * 24 * 60 * 60,
  },
};

export default (req, res) => NextAuth(req, res, options);
