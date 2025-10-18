function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-WP-Nonce': getNonce(),
  };
}

function getNonce() {
  return document.querySelector('input[name="vz-st-nonce"]').value;
}

function getPostId() {
  return document.querySelector('input[name="vz-st-post-id"]').value;
}

function getScript() {
  console.log('vz_script', window.vz_script);
  return window.vz_script;
}

function getApiUrl() {
  return document.querySelector('input[name="vz-st-api-url"]').value;
}

async function saveScript(script) {
  const response = await fetch(`${getApiUrl()}script`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      script: script,
      post_id: getPostId(),
    }),
  });
  return response.json();
}

const api = {
  getScript,
  saveScript,
};

export default api;
