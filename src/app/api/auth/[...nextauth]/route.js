import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
providers: [
CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email:",
      type: "text",
    },
    motDePasse: {
      label: "Password:",
      type: "password",
    },
  },
  async authorize(credentials) {
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials?.email,
          motDePasse: credentials?.motDePasse,
        }),
      });
      const response = await res.json();
      console.log(response);
      if (response.success === false) {
        throw new Error("Invalid credentials");
      }
      if (response.user) {
        return {
          ...response.user,
          password: null,
          role: response.user.role,
          email: response.user.email,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },
}),
GitHubProvider({
clientId: "Ov23liuMunx2Zlu87PIX",
clientSecret: "b54e6ffa94b163d81236e1dbec355a750669365b",
}),
GoogleProvider({
clientId: "1020500898608-ppl66ue2piv3u67dqsa4i2cu1tcbhkgr.apps.googleusercontent.com",
clientSecret: "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"
})
],
secret: process.env.SECRET,
callbacks: {
async jwt({ token, user }) {
if (user){
token.role = user.role;

}
return token;
},
async session({ session, token }) {
if (session?.user) {
session.user.role = token.role;
session.user.email = token.email;
}
return session;
},
},
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }