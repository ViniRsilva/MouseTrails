import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Obtém o caminho do módulo atual
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);
const __dirname = dirname(_dirname);

const fastify = Fastify({ logger: true });

fastify.register(FastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public",
});
export default function bootstrap() {
  try {
    fastify.listen({ port: 3333 });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

fastify.get("/", (req, reply) => {
  return "cara to morrendo ja";
});
