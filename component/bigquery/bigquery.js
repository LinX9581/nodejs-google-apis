import * as googleApis from '../../api/googleApis/googleApis'

// test();
async function test() {
  let totalBqPv = "SELECT SUM(pageviews) AS total_pageviews FROM `nownews-analytics.ga3_supermetrics.GA_CONTENT_20210702`";
  const [totalPvData] = await googleApis.bigquery.query({ query: totalBqPv });
  console.log(totalPvData);
}