import { prisma } from "../../../database/generated/prisma-client";
export const getProductsByName = async (q: string) => {
  // if (q.length < 3) {
  //   return [];
  // }

  const result = await prisma.products({
    where: {
      name_contains: q,
    },
  });
  return result;
};
