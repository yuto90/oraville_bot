function timeSignal() {
  // discord側で作成したボットのウェブフックURL
  const discordWebHookURL = PropertiesService.getScriptProperties().getProperty("WEBHOOK_URL")!;

  interface Message {
    content: string;
    username?: string;
    tts: boolean;
  }

  interface DiscordSendParameters {
    method: "get" | "delete" | "patch" | "post" | "put";
    payload: string;
    contentType: string;
    muteHttpExceptions: boolean;
  }

  // 今の時間のnumberを0~23で返却
  const getNowHours = (): number => new Date().getHours();

  // 送信するテキストを生成
  const generateContent = (): string => {
    let hours = getNowHours();
    const ampm: string = hours > 12 ? "午後" : "午前";

    if (hours > 12) hours -= 12;

    const content = `ニーッコニッコ動画♪ ドワンゴが${ampm + hours}時くらいをお知らせします。ピッ、ピッ、ピッ、ピーン`;

    return content;
  };

  // 投稿するチャット内容と設定
  const message: Message = {
    content: generateContent(),
    username: PropertiesService.getScriptProperties().getProperty("BOT_NAME")!,
    tts: false, // ロボットによる読み上げ機能を無効化
  };

  //Postリクエストのパラメータを作成
  const params: DiscordSendParameters = {
    method: "post",
    payload: JSON.stringify(message),
    contentType: "application/json",
    muteHttpExceptions: true, //エラーを起こしたときに、エラーの代わりに内容をHttpResponseを返してくれる
  };

  // 通知する時間帯のリスト
  const noticeHours: number[] = [20, 21, 22, 23, 0];

  // 通知しない時間帯以外であれば
  if (noticeHours.indexOf(getNowHours()) !== -1) {
    UrlFetchApp.fetch(discordWebHookURL, params);
  }
}
