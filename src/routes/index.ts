import { Router } from "express";
import { authRouter } from "../routes/auth.js";
import { profileTargetsRouter } from "../routes/profile-targets.js";
import { trackerRouter } from "../routes/tracker.js";
import { recipesRouter } from "../routes/recipes.js";
import { followRouter } from "../routes/follow.js";
import { workoutLogsRouter } from "../routes/workout-logs.js";
import { onboardingRouter } from "../routes/onboarding.js";
import { cheatMealsRouter } from "../routes/cheat-meals.js";
import { vegabotRouter } from "../routes/vegabot.js";
import { usersRouter } from "../routes/users.js";
import { catalogRouter } from "../routes/catalog.js";
import { journeyStepRouter } from "../routes/journey-step.js";
import { postsRouter } from "../modules/posts/posts.router.js";
import { uploadsRouter } from "../routes/uploads.js";
import { dmRouter } from "../modules/dm/dm.router.js";
import { gymRouter } from "../routes/gym.js";
import { adminRouter } from "../routes/admin.js";

export const apiRouter = Router();

apiRouter.use(authRouter);
apiRouter.use(profileTargetsRouter);
apiRouter.use(trackerRouter);
apiRouter.use(recipesRouter);
apiRouter.use(postsRouter);
apiRouter.use(followRouter);
apiRouter.use(workoutLogsRouter);
apiRouter.use(onboardingRouter);
apiRouter.use(cheatMealsRouter);
apiRouter.use(vegabotRouter);
apiRouter.use(usersRouter);
apiRouter.use(uploadsRouter);
apiRouter.use(dmRouter);
apiRouter.use(catalogRouter);
apiRouter.use(journeyStepRouter);
apiRouter.use(gymRouter);
apiRouter.use(adminRouter);

