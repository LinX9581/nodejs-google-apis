import * as googleApis from '../api/googleApis/gaCustom'
import '../component/bigquery/bigquery'
import '../component/gs/sheetSample'
import '../component/youtube/youtubeSample'
import '../component/ga/gaSample'

// test()
export async function test() {
    try {
        let gaDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');

        // ga3
        let ga3Data = await googleApis.gaCustom(config.gaViewId.ga3AllIds, gaDate, gaDate, "ga:pageviews, ga:1dayUsers, ga:sessions, ga:pageviewsPerSession", "ga:date");
        console.log(ga3Data);

        // ga4
        let ga4Data = await googleApis.ga4Custom(config.gaViewId.ga4AllIds, gaDate, gaDate, 'screenPageViews', 'pageTitle');
        console.log(ga4Data);

        // sheet
        await googleApis.updateGsSheet(config.sheetId.test, 'test1' + '!A1', [
            ['1asdasd']
        ])

        await googleApis.createGsSheet(config.sheetId.test, '123')
        await sleep(1000)
    } catch (error) {
        console.log(error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}