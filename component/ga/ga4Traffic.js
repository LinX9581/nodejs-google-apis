import * as googleApis from '../../api/googleApis/gaCustom'

let allIds = config.gaViewId.ga4AllIds

// getGa4Data()
export async function getGa4Data() {
  let gaDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
  let metrics, dimension, filter, order;
  let trafficName = ['google']

	metrics = '', dimension = '', filter = ''
	metrics = [ { name: 'screenPageViews' }]
	dimension = [{ name: 'firstUserSource' }]
	filter = {
		dimensionFilter: {
			filter: {
				fieldName: "firstUserSource",
				stringFilter: { matchType: "CONTAINS", value: trafficName[0], caseSensitive: false }
			}
		},
	}
	order = [{
		metric: {
			metricName: 'screenPageViews',
		},
		desc: true,
	}]
	
	let ga4Data = await googleApis.ga4Custom(allIds, gaDate, gaDate, metrics, dimension, filter, order, '5');
	console.log(ga4Data);
	let pv = sum(ga4Data.screenPageViews)
	console.log(pv);
}

function sum(array) {
  let pv = 0;
  array.forEach(element => {
    pv += parseInt(element)
  });
  return pv
}