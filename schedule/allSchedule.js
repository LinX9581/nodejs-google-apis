import * as googleApis from "../api/googleApis/gaCustom.js";
import '../component/bigquery/bigquery.js';
import '../component/gs/sheetSample.js';
import '../component/ga/gaSample.js';
import config from "../config.js";
// import '../component/youtube/youtubeSample.js';

// test()
export async function test() {
    try {
        let gaDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');

        // ga4
        let ga4Data = await googleApis.ga4Custom(config.gaViewId.ga4AllIds, gaDate, gaDate, [{ name: "screenPageViews" }], [{ name: "pageTitle" }]);
        console.log(ga4Data);

        await sleep(1000)
    } catch (error) {
        console.log(error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}