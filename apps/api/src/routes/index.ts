import { Router } from 'express';
import { funderRequestRouter } from './funderRequests';
import { projectsRouter } from './projects';
import { organizationsRouter } from './organizations';
import { profilesRouter } from './profiles';

export const apiRouter = Router();

apiRouter.use('/funder-requests', funderRequestRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/organizations', organizationsRouter);
apiRouter.use('/profiles', profilesRouter);
