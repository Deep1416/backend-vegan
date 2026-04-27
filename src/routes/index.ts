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
import { postsRouter } from "../modules/posts/posts.router.js";

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
apiRouter.use(catalogRouter);

