// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const personResultParser = z.object(
    {
        name: z.string().max(100),
    }
);

type PersonResult = z.infer<typeof personResultParser>
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async (id: string): Promise<PersonResult["name"]> => {
    const data = await fetch(
        "https://www.totaltypescript.com/swapi/people/" + id + ".json",
    ).then((res) => res.json());

    const parsedData = personResultParser.parse(data);

    return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
    expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
    expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});
