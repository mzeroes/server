import { Request, Response } from "express";
import { prisma } from "../../database/generated/prisma-client";
import searchRoutes from "./search/routes";

export default [
  ...searchRoutes,
	{
		method: "get",
		path: "/users/:id",
		handler: [
			async ({ query, params }: Request, res: Response) => {
				const result = await prisma.users({
					where: {
						id: params.id,
					},
				});
				res.status(200).send(result);
			},
		],
	},
];
