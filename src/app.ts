import express from "express";
import { dateValidation } from "./middleware/in";
import {
  closestWeekDay,
  closestWeekDayBefore,
} from "./actions/closest-week-day";
import { errorHandler, sendSuccess } from "./middleware/out";
import { BadRequestError, DateHandler } from "./types";
import auth from "./middleware/authorization";
import authorization from "./actions/auth";
import bodyParser from "body-parser"

const app = express();
const port = 3003;
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


router.use(`/authorization/closest-week-day*`, dateValidation);
router.use(`/authorization`, authorization )

router.get("/", (req, res) => {
  res.status(200).send({ message: "Api works!" });
});

router.get("/authorization/closest-week-day", ({ res }: DateHandler) => {
  try {
    sendSuccess(res, closestWeekDay(res.locals.date));
  } catch (err: unknown) {
    errorHandler(res, err);
  }
});

router.get("/authorization/closest-week-day-before", (req, res) => {
  try {
    sendSuccess(res, closestWeekDayBefore(res.locals.date));
  } catch (err: unknown) {
    errorHandler(res, err);
  }
});

router.post("/login", auth.loginUser)

app.use("/", router);

app.listen(port, () => {});
