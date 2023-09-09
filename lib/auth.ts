import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: 'login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    //* Adding role to JWT token
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        role: dbUser.role,
      };
    },
    //* Adding role to session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { NextAuthOptions, getServerSession } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import prisma from './db';
// import bcrypt from 'bcrypt';

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: 'login',
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'jsmith@gmail.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             return null;
//           }

//           //* Check if user exists
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials.email,
//             },
//           });

//           if (!user || !user.password) {
//             return null;
//           }

//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             user.password!
//           );

//           if (!isPasswordValid) {
//             return null;
//           }

//           return {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//           };
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     //* Adding role to JWT token
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }

//       return token;
//     },
//     //* Adding role to session
//     async session({ session, token }) {
//       if (token) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export const getAuthSession = () => {
//   return getServerSession(authOptions);
// };
