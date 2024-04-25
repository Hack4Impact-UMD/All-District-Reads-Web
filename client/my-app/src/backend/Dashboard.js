const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

app.use(express(json));
const app_name_to_uuid = {
  Analytics: "cf160e8e-ec9b-11ee-91df-0bde2311901f",
  // other mappings...
};

router.post("/embedUrl", async (req, res) => {
  const data = req.body;
  const app_uuid = app_name_to_uuid[data.Analytics];

  // userJwt is an example variable that the frontend could pass to your backend,
  // for use in a Retool application. Not required, used for demo purposes.
  const secret_key = process.env.SECRET_KEY;
  const decoded = jwt.decode(data.userJwt, secret_key);
  const { token, firstName, lastName, email } = decoded;

  const headers = {
    Authorization: `Bearer ${process.env.RETOOL_API_KEY}`,
    "Content-type": "application/json",
  };

  const body = {
    landingPageUuid: app_uuid,
    groupIds: [12, 13],
    externalIdentifier: token,
    userInfo: {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    metadata: {
      storeId: 5,
    },
  };

  try {
    const response = await fetch(
      `https://${process.env.RETOOL_URL}/api/embed-url/external-user`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) throw new Error("Response not OK");

    const jsonResponse = await response.json();
    res.json(jsonResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
