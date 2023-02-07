import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */
const Id = z.object({ id: z.string().uuid() })

const User = z.object({
    name: z.string(),
}).merge(Id);

const Post = z.object({
    title: z.string(),
    body: z.string(),
}).merge(Id);

const Comment = z.object({
    text: z.string(),
}).merge(Id);

type cases = [
    Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
    Expect<
        Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
    >,
    Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>,
];
