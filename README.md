In the backend folder,
    -> create a .env file and enter the DATABASE_URL (it is the actual postgres database url)
    -> create a wrangler.toml file and add the following
                [vars]
                DATABASE_URL="" (the URL for prisma connection pooling)
                JWT_SECRET=""

In the frontend folder,
    -> locate the config.ts file and add the URL of you backend