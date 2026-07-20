import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

type Db = ReturnType<typeof createDb>

function createDb() {
  return drizzle({ client: neon(process.env.DATABASE_URL!), schema })
}

let instance: Db | undefined

// Lazy: Next.js evaluates this module during build-time page-data collection,
// before DATABASE_URL is available in the build environment.
export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    instance ??= createDb()
    const value = Reflect.get(instance, prop)
    return typeof value === "function" ? value.bind(instance) : value
  },
})
