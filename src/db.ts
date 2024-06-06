import { PrismaClient } from "@prisma/client"

export const prismaClient = new PrismaClient(); // we don't need this one but rather a mock one with same syntaxs

// this does mock the prisma's general db.sum.create() function
// export const prismaClient = {
//     sum: {
//         create: ()=> { 

//         }
//     }
// }