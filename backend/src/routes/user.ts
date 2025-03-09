import {Hono} from "hono"

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'
import z from "zod";
import { signupInput } from "@okaymahimasingh/medium-common"


export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET: string
    }
  }>()

  

userRouter.post('/signup',   async (c) => {
  const body = await c.req.json()
  const {success} = signupInput.safeParse(body)
  if(!success) {
    return c.status(403)
    c.json({
      message : "Incorrect Inputs"
    })
  }
  console.log("Request body:", body);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


 
  try {
    const user = await prisma.user.create({
      data : {
        email : body.email,
        password : body.password,
        name : body.name
   
      }
    
  }) 
  const jwt = await sign({
    id : user.id
  }, c.env.JWT_SECRET);
  return c.text(jwt)
} catch(e) {
      console.error("Error creating user:", e);
      c.status(411);
      return c.text('invalid')
  }
  
});

userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  console.log("Request body:", body);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


 
  try {
    const user = await prisma.user.findFirst({
      where : {
        email : body.email,
        password : body.password,
        
   
      }
    
  }) 

  if(!user){
    c.status(403);
    return c.text('Incorrect Credentials')
  }
  const jwt = await sign({
    id : user.id
  }, c.env.JWT_SECRET);
  return c.text(jwt)
} catch(e) {
      console.error("Error creating user:", e);
      c.status(403);
      return c.json({
        msg : "Invalid"
      })
  }
})

