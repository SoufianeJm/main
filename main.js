const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const users = new sdk.Users(client);
  let email;

  try {
    // Parse email from request body
    const body = req.body ? JSON.parse(req.body) : {};
    email = body.email;
    if (!email) {
      return res.json({ exists: false, error: 'No email provided' });
    }

    // Efficiently search for user by email
    const list = await users.list(undefined, undefined, email);
    const exists = list.users.some(u => u.email.toLowerCase() === email.toLowerCase());

    return res.json({ exists });
  } catch (err) {
    return res.json({ exists: false, error: err.message });
  }
};
