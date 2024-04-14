import express, { Request, Response, NextFunction } from 'express';
import { InitRequest } from '@soulmachines/smskillsdk';
import { initHandler } from 'api/handlers/init';
import { endProjectHandler } from 'api/handlers/end_project';

const router = express.Router();

router.post(
  '/init',
  (request: Request, response: Response, next: NextFunction) => {
    console.log('init Request: ' + JSON.stringify(request.body));
    const initRequest: InitRequest = request.body;
    initHandler(initRequest);
    response.setHeader('Content-Type', 'application/json');
    response.status(202).send({});
  },
);

router.delete(
  '/delete/:id',
  (request: Request, response: Response, next: NextFunction) => {
    console.log(
      'Request: delete endpoint endProject' + JSON.stringify(request.params),
    );
    const projectId = request.params.id;
    endProjectHandler(projectId);
    response.setHeader('Content-Type', 'application/json');
    response.status(202).send({});
  },
);

export default router;
