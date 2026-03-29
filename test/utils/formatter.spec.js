import assert from "node:assert/strict";
import test from "node:test";

import { generateThreadName } from "#utils/formatter.js";

function parseLocalDateTime(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute, second);
}

const mockData = [
  {
    name: "Round.01 week01 - 01.01 復盤",
    date: "2026-01-01",
    time: "09:00:00",
    expected: "Round.01 week01 - 01.01 復盤"
  },
  {
    name: "Round.01 week02 - 01.07 復盤",
    date: "2026-01-07",
    time: "09:00:00",
    expected: "Round.01 week02 - 01.07 復盤"
  },
  {
    name: "Round.02 week01 - 04.01 復盤",
    date: "2026-04-01",
    time: "09:00:00",
    expected: "Round.02 week01 - 04.01 復盤"
  },
  {
    name: "Round.02 week14 - 06.30 復盤",
    date: "2026-06-30",
    time: "09:00:00",
    expected: "Round.02 week14 - 06.30 復盤"
  },
  {
    name: "Round.03 week01 - 07.05 復盤",
    date: "2026-07-05",
    time: "09:00:00",
    expected: "Round.03 week01 - 07.05 復盤"
  },
  {
    name: "Round.03 week14 - 09.27 復盤",
    date: "2026-12-31",
    time: "09:00:00",
    expected: "Round.04 week14 - 12.31 復盤"
  },
  {
    name: "Round.01 week01 - 01.03 復盤",
    date: "2027-01-03",
    time: "09:00:00",
    expected: "Round.01 week01 - 01.03 復盤"
  }
];

test("generateThreadName()", context => {
  for (const data of mockData) {
    const now = parseLocalDateTime(data.date, data.time);

    context.mock.timers.enable({
      apis: ["Date"],
      now,
    });

    const actual = generateThreadName();
    assert.equal(
      actual,
      data.expected,
      `${data.date} Failed. Expected ${data.expected}, but got ${actual}`,
    );

    context.mock.timers.reset();
  }
});
