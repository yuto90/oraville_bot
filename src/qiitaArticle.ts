/**
 * qiita記事を取得する
 * @return APIリクエストのデータ
 */
function getPosts() {
  const REQUEST_URL = "https://qiita.com/api/v2/items?page=1&per_page=100&query=stocks%3A%3E6+created%3A%3E";
  // 3日前を指定する
  //var term = Moment.moment().add(-3,'d').format('YYYY-MM-DD');
  const term = "2023-04-09";

  try {
    var response = UrlFetchApp.fetch(REQUEST_URL + term);
    return JSON.parse(response.getContentText());
  } catch (e: any) {
    throw "エラーが発生しました。確認してください。" + e.message;
  }
}
