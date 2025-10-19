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
  return window.vz_script;
}

function getApiUrl() {
  return document.querySelector('input[name="vz-st-api-url"]').value;
}

async function saveScript(script) {
  const response = await fetch(`${getApiUrl()}script/${getPostId()}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      script: script,
    }),
  });
  return response.json();
}

const api = {
  getScript,
  saveScript,
};

export default api;
