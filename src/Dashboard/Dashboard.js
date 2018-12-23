import React, { Component } from 'react';
import KeenDataviz from 'keen-dataviz';
import KeenAnalysis from 'keen-analysis'; // API client
import { keenClient } from '../config';

import 'keen-dataviz/dist/keen-dataviz.css';
import './Dashboard.css';

class Dashboard extends Component {

    componentDidMount() {
        let client = new KeenAnalysis({
            projectId: keenClient.projectId,
            readKey: keenClient.readKey
          });

        const chartSumOfPageViews = new KeenDataviz()
            .el("#chart-sum-of-pageviews")
            .height(240)
            .title("Sum of pageviews")
            .type("metric")
            .prepare();

            client
            .query("count", {
                event_collection: "pageviews",
                timeframe: "this_14_days",
                timezone: "Europe/Paris"
            })
            .then(function(res) {
                console.log(res);
                chartSumOfPageViews.data(res).render();
            })
            .catch(function(err) {
                chartSumOfPageViews.message(err.message);
            });
            console.log('analysis ', client);
            console.log('dataviz ', chartSumOfPageViews);

        const chartByBrowsers = new KeenDataviz()
            .el("#chart-browsers-by-family")
            .height(240)
            .title("Pageviews by browser family")
            .type("piechart")
            .prepare();
          
          client
            .query("count", {
              event_collection: "pageviews",
              group_by: ["tech.info.browser.family"],
              timeframe: "this_14_days",
              timezone: "Europe/Paris"
            })
            .then(function(res) {
              chartByBrowsers.data(res).render();
            })
            .catch(function(err) {
              chartByBrowsers.message(err.message);
            });

        const chartPageViewsByPath = new KeenDataviz()
            .el("#chart-pageviews-by-path")
            .height(240)
            .title("Pageviews by path")
            .type("table")
            .prepare();
          
          client
            .query("count", {
              event_collection: "pageviews",
              group_by: ["page.info.path"],
              timeframe: "this_14_days",
              timezone: "Europe/Paris"
            })
            .then(function(res) {
              chartPageViewsByPath.data(res).render();
            })
            .catch(function(err) {
              chartPageViewsByPath.message(err.message);
            });
    }

    render() {
        return (
        <div className="dashboard">
            <div className="dashboard-row">
                <div id="chart-sum-of-pageviews" className="dashboard-chart"></div>
                <div id="chart-browsers-by-family" className="dashboard-chart"></div>
            </div>
            <div className="dashboard-row">
                <div id="chart-pageviews-by-path" className="dashboard-chart"></div>
            </div>
        </div>
        );
    }
    
}

export default Dashboard;
