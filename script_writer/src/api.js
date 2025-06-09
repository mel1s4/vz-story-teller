import axios from 'axios';

function getRestUrl() {
  if (window && window.vz_availability_rules_params && window.vz_availability_rules_params.rest_url) {
    return window.vz_availability_rules_params.rest_url;
  }
  return 'http://localhost/wp-json/';
}

function getRestNonce() {
  if (window && window.vz_availability_rules_params && window.vz_availability_rules_params.rest_nonce) {
    return window.vz_availability_rules_params.rest_nonce;
  }
  return '';
}

function getHeaders() {
  return {};
  const restNonce = getRestNonce();
  return {
    'X-WP-Nonce': restNonce
  };
}

const api = {
  post: async (endpoint, params) => {
    const restUrl = getRestUrl();

    try {
      return await axios.post(restUrl + 'vz-st/v1/' + endpoint, params, {
        headers: getHeaders()
      });
    } catch (e) {
      console.log('Failed to fetch', e);
    }
  },
  get: async (endpoint, params) => {
    const restUrl = getRestUrl();
    try {
      return await axios.get(restUrl + 'vz-st/v1/' + endpoint, {
        params,
        headers: getHeaders()
      });
    } catch (e) {
      console.log('Failed to fetch', e);
    }
  }
}

export default api;
