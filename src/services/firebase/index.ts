import { Request, Response } from "express";
import * as admin from "firebase-admin";

// tslint:disable-next-line:no-submodule-imports
import serviceAccount from "./serviceAccount.keys";

admin.initializeApp({
  credential: admin.credential.cert (
    {
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key
    }
  ),
  databaseURL: "https://morphine-c575e.firebaseio.com"
});

export default [
  {
    method: "post",
    path: "/fireuser",
    handler: [
      async ({ body }: Request, res: Response) => {
        try {
        const result  = await admin.auth().getUser(body.uid);
        // prisma.createUser({ });
        res.status(200).send({...result, type: "success"});
        } catch (err) {
          res.status(500).send("Server Error");
        }
      },
    ],
  },
];



