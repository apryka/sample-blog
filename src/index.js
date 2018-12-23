import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { keenClient } from './config';
import KeenTracking from 'keen-tracking';

const client = new KeenTracking({
  projectId: keenClient.projectId,
  writeKey: keenClient.writeKey
});
const helpers = KeenTracking.helpers;
const utils = KeenTracking.utils;
const sessionCookie = utils.cookie('rename-this-example-cookie');
if (!sessionCookie.get('guest_id')) {
  sessionCookie.set('guest_id', helpers.getUniqueId());
}
  
// optional
client.extendEvents(() => {
  return {
    geo: {
      // eslint-disable-next-line
      ip_address: '${keen.ip}',
      info: {
        /* Enriched data from the API will be saved here */
        /* https://keen.io/docs/api/?javascript#ip-to-geo-parser */
      }
    },
    page: {
      title: document.title,
      url: document.location.href,
      info: { /* Enriched */ }
    },
    referrer: {
      url: document.referrer,
      info: { /* Enriched */ }
    },
    tech: {
      browser: helpers.getBrowserProfile(),
      // eslint-disable-next-line
      user_agent: '${keen.user_agent}',
      info: { /* Enriched */ }
    },
    time: helpers.getDatetimeIndex(),
    visitor: {
      guest_id: sessionCookie.get('guest_id')
      /* Include additional visitor info here */
    },
    keen: {
      addons: [
        {
          name: 'keen:ip_to_geo',
          input: {
            ip: 'geo.ip_address'
          },
          output : 'geo.info'
        },
        {
          name: 'keen:ua_parser',
          input: {
            ua_string: 'tech.user_agent'
          },
          output: 'tech.info'
        },
        {
          name: 'keen:url_parser',
          input: {
            url: 'page.url'
          },
          output: 'page.info'
        },
        {
          name: 'keen:referrer_parser',
          input: {
            referrer_url: 'referrer.url',
            page_url: 'page.url'
          },
          output: 'referrer.info'
        }
      ]
    }
  }
});

// record the event
client
  .recordEvent('pageviews', {
    // here you can add even more data
    // some_key: some_value
  })
  .then((response) => {
    // handle responses
  }).catch(error => {
    // handle errors
  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
