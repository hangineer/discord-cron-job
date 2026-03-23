export function generateThreadName() {
  const today = new Date();
  const tzToday = new Date(
    today.toLocaleString("en-US", { timeZone: "Asia/Taipei" }),
  );

  const month = tzToday.getMonth() + 1;
  const date = tzToday.getDate();

  const round = Math.ceil(month / 3);
  const roundStr = String(round).padStart(2, "0");

  const startMonthIndex = (round - 1) * 3;
  const startOfRound = new Date(tzToday.getFullYear(), startMonthIndex, 1);

  console.log("startOfRound", startOfRound);

  const diffTime = Math.abs(tzToday - startOfRound);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const week = Math.ceil((diffDays + startOfRound.getDay()) / 7);
  const weekStr = String(week).padStart(2, "0");

  const monthStr = String(month).padStart(2, "0");
  const dateStr = String(date).padStart(2, "0");

  return `Round.${roundStr} week${weekStr} - ${monthStr}.${dateStr} 復盤`;
}
