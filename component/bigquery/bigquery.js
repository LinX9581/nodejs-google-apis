import { getBqAuth } from "../../api/googleApis/googleAuth.js";

// 使用統一認證模組獲取 BigQuery 客戶端
const bigquery = getBqAuth("nownews-analytics");

// customSchema()
async function customSchema() {
  // 整體流量
  let getRt30Min = `
  SELECT
  (
  SELECT
    value.string_value
  FROM
    UNNEST(event_params)
  WHERE
    KEY = "page_title" ) AS page_title,
  (
  SELECT
    value.string_value
  FROM
    UNNEST(event_params)
  WHERE
    KEY = "page_location" ) AS page_location,
  (
  SELECT
    value.string_value
  FROM
    UNNEST(event_params)
  WHERE
    KEY = "source" ) AS SOURCE,
  (
  SELECT
    value.string_value
  FROM
    UNNEST(event_params)
  WHERE
    KEY = "medium" ) AS medium,
  COUNT(event_name) AS views,
  COUNT(DISTINCT user_pseudo_id) AS users
FROM
  \`nownews-analytics.analytics_274947839.events_intraday_*\`
WHERE
  event_name = 'page_view'
  AND TIMESTAMP_MICROS(event_timestamp) >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 MINUTE)
  AND _TABLE_SUFFIX = FORMAT_DATE("%Y%m%d", CURRENT_DATE())
GROUP BY
  page_title,
  page_location,
  SOURCE,
  medium
ORDER BY
  views DESC
LIMIT
  10
  `;

  const [getRt30MinData] = await bigquery.query({ query: getRt30Min });
  console.log(getRt30MinData);
}
