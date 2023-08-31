import { closestWeekDay, closestWeekDayBefore } from "./closest-week-day";

describe("Testing the closest weekday", () => {
  it("if the date provided IS a holyday, it should return the next week day", () => {
    const currentDate = new Date(2023, 3, 1);
    const resultDate = closestWeekDay(currentDate);

    const expectedDate = new Date(2023, 3, 3);
    expect(expectedDate).toStrictEqual(resultDate);
  });
});

describe("Testing the closest weekday", () => {
  it("if the date provided IS a holyday, it should return the previous week day", () => {
    const currentDate = new Date(2023, 3, 1);
    const resultDate = closestWeekDayBefore(currentDate);

    const expectedDate = new Date(2023, 2, 31);
    expect(expectedDate).toStrictEqual(resultDate);
  });
});
