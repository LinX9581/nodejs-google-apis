import * as googleApis from "../../api/googleApis/gaCustom";

let allIds = config.gaViewId.ga4AllIds;

// getMetrics();
export async function getMetrics() {
  try {
    let gaDate = moment(new Date()).add(-1, "days").format("YYYY-MM-DD");
    let metrics, dimension;

    metrics = [
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "activeUsers" },
      { name: "active1DayUsers" },
      { name: "newUsers" },
      { name: "sessions" },
    ];
    dimension = [{ name: "date" }];

    let ga4Data = await googleApis.ga4Custom(allIds, gaDate, gaDate, metrics, dimension);
    console.log(ga4Data);
  } catch (error) {
    console.log(error);
  }
}

// getSourceMedium()
export async function getSourceMedium() {
  try {
    let startDate = "2024-01-01";
    let endDate = "2024-04-09";

    let metrics, dimensions, filters;

    metrics = [{ name: "screenPageViews" }];
    dimensions = [{ name: "sessionSource" }, { name: "sessionMedium" }];

    filters = {
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: "sessionSource",
                stringFilter: {
                  matchType: "EXACT",
                  value: "feed_related",
                },
              },
            },
            {
              filter: {
                fieldName: "sessionMedium",
                stringFilter: {
                  matchType: "EXACT",
                  value: "seven",
                },
              },
            },
          ],
        },
      },
    };

    let ga4Data = await googleApis.ga4Custom(allIds, startDate, endDate, metrics, dimensions, filters);
    console.log(ga4Data);
  } catch (error) {
    console.log(error);
  }
}
