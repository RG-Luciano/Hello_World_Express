import express from "express";
import { dateValidation } from "./middleware/in";
import {
  closestWeekDay,
  closestWeekDayBefore,
} from "./actions/closest-week-day";
import { errorHandler, sendSuccess } from "./middleware/out";
import { BadRequestError, DateHandler } from "./types";

const app = express();
const port = 3003;
const router = express.Router();

router.use(`/closest-week-day*`, dateValidation);

router.get("/", (req, res) => {
  res.status(200).send({ message: "Api works!" });
});

router.get("/closest-week-day", ({ res }: DateHandler) => {
  try {
    sendSuccess(res, closestWeekDay(res.locals.date));
  } catch (err: unknown) {
    errorHandler(res, err);
  }
});

router.get("/closest-week-day-before", (req, res) => {
  try {
    sendSuccess(res, closestWeekDayBefore(res.locals.date));
  } catch (err: unknown) {
    errorHandler(res, err);
  }
});

app.use("/", router);

app.listen(port, () => {});
