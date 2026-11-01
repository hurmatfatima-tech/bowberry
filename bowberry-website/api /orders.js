module.exports = async (req, res) => {

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  // Google Apps Script URL from Vercel environment variables
  const scriptUrl = process.env.APPS_SCRIPT_URL;

  if (!scriptUrl) {
    return res.status(500).json({
      ok: false,
      error: "Google Apps Script URL is missing."
    });
  }

  try {

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(req.body)
    });

    const responseText = await response.text();

    let result;

    try {
      result = JSON.parse(responseText);
    } catch (error) {
      throw new Error("Invalid response from Google Apps Script.");
    }

    if (!response.ok || !result.ok) {
      return res.status(400).json({
        ok: false,
        error: result.error || "Could not save order."
      });
    }

    return res.status(200).json(result);

  } catch (error) {

    console.error("Bowberry API error:", error);

    return res.status(500).json({
      ok: false,
      error: error.message || "Order could not be processed."
    });

  }

};
