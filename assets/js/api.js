// ONLY place where API_BASE should exist
const API_BASE = "https://script.google.com/macros/s/AKfycbzhxhsILqRzZiLpFndMt7-AwACI2ebYA_7cxYCNkHRXNetVzfFnDMq8RM_T7tBISRO-Mw/exec";

async function apiPost(endpoint, data = {}) {
    try {
        const response = await fetch(`${API_BASE}?endpoint=${endpoint}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch (err) {
        console.error("API POST error:", err);
        return { success: false, message: "Request failed" };
    }
}
