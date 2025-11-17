// wrapper for API
const API_BASE = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'; // replace
export async function callApi(action, payload) {
  const res = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ action, payload }) });
  return res.json();
}
