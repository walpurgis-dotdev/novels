import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import authors from "../data/authors.js";
import genres from "../data/genre.js";
import characters from "../data/characters.js";
import factions from "../data/factions.js";
import level from "../data/level.js";
import sights from "../data/sights.js";
import worlds from "../data/worlds.js";

async function main() {
   try {
      console.log("info", "Seeding database...");
      const newCharacter = await prisma.tags.createMany({
         data: characters,
         skipDuplicates: true,
      });
      console.log("info", `Seeded ${newCharacter} characters`);
      const newFaction = await prisma.tags.createMany({
         data: factions,
         skipDuplicates: true,
      });
      console.log("info", `Seeded ${newFaction} factions`);
      const newSight = await prisma.tags.createMany({
         data: sights,
         skipDuplicates: true,
      });
      console.log("info", `Seeded ${newSight} sights`);
      const newWorld = await prisma.tags.createMany({
         data: worlds,
         skipDuplicates: true,
      });
      console.log("info", `Seeded ${newWorld} worlds`);
      console.log("info", "Seeding completed.");
   } catch (error) {
      console.log(error);
   }
}

main()
   .catch((e) => {
      throw e;
   })
   .finally(async () => {
      await prisma.$disconnect();
      process.exit(0);
   });
