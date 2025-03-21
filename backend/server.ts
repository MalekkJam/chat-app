import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { registration , login} from "./middlewares/user.ts";

const router = new Router();
const app = new Application();
const port = Deno.args[0] ? Number(Deno.args[0]) : 3000;

router.post("/registration", registration);
router.post("/login",login) ; 

app.use(
  oakCors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Oak server running on port ${port}`);

await app.listen({ port });
