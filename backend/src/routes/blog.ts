import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify} from 'hono/jwt'
export const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET: string
    },
      
        Variables : {
           userId : string
        } 
  }>()



  blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization" ) || "";
    try {
      const user =  await verify(authHeader, c.env.JWT_SECRET); 
    if( user) {
      //@ts-ignore
         c.set("userId", user.id);
         await  next();
  
    }else {
      c.status(403);
      next();
      return c.json({
        message : "you are not logged in"
      })
    }
  }catch(e) {
    c.status(403);
    next();
    return c.json({
      message : "you are not logged in"
    })
  }
})

  blogRouter.post('/create', async (c) => {
    const body = await c.req.json();
    
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
  

    const post = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: parseInt(authorId)
      }
    }); 
    return c.json({
      id: post.id
    });
  })
  
   blogRouter.put('/adding', async (c) => {
     const userId = c.get('userId');
     const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    prisma.blog.update({
      where: {
        id:body.id,
  
      },
      data: {
        title: body.title,
        content: body.content
      }
    });
  
    return c.text('updated post');
  
   });
   
   blogRouter.get('/:id', async (c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const blog = await prisma.blog.findFirst({
        where: {
          id : id
        }
      })
       return c.json({
        blog
       })
    }catch(e) {
      c.status(401);
      return c.json({
        message: "Error while fetching blog post"
      });
    }
   
   })
  
   blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany();
  
      return c.text('blogs')
    })