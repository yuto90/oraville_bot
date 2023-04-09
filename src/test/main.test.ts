import { getNowHours, generateContent } from "../main";

test("現在時間がnumberで取得できていること", () => {
  const result = getNowHours();
  expect(result).toBeGreaterThanOrEqual(0); // 0以上のnumberであるか
  expect(result).toBeLessThanOrEqual(23); // 23以下のnumberであるか
});

test("generateContent()から期待値通りの文言が生成されていること", () => {
  const result = generateContent();
  let hours = new Date().getHours();

  // 午前/午後が正しく含まれていること
  if (hours < 12) {
    expect(result).toContain("午前");
  } else {
    expect(result).toContain("午後");
  }

  // 時刻が正しく含まれていること
  if (hours > 12) hours -= 12;
  expect(result).toContain(`${hours}時`);
});
