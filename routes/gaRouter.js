import express from "express";
import * as googleApis from "../api/googleApis/gaCustom";
const router = express.Router();

let allIds = config.gaViewId.ga4AllIds;

router.get("/ga4/:id/:startDate/:endDate/:dimensions/:metrics", async function (req, res) {
  try {
    const { id, startDate, endDate, dimensions, metrics } = req.params;

    // Split the dimensions and metrics parameters into arrays
    const dimensionsArray = dimensions.split(",");
    const metricsArray = metrics.split(",");

    // Map dimensions and metrics into the format expected by the GA4 API
    const formattedDimensions = dimensionsArray.map((dimension) => ({ name: dimension }));
    const formattedMetrics = metricsArray.map((metric) => ({ name: metric }));

    // Call the GA4 API
    let ga4Data = await googleApis.ga4Custom(id, startDate, endDate, formattedMetrics, formattedDimensions);

    // 把結果重新組成物件
    let formattedData = ga4Data.date.map((date, index) => {
      let dataEntry = { date };

      metricsArray.forEach((metric) => {
        if (ga4Data[metric] && ga4Data[metric][index] !== undefined) {
          dataEntry[metric] = ga4Data[metric][index];
        }
      });

      return dataEntry;
    });
    res.json(formattedData);
  } catch (error) {
    console.log(error);
  }
});

export default router;
