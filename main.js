const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const users = new sdk.Users(client);
  const { email } = JSON.parse(req.body || '{}');

  if (!email) {
    return res.json({ exists: false, error: 'No email provided' });
  }

  try {
    const list = await users.list();
    const exists = list.users.some(u => u.email === email);
    return res.json({ exists });
  } catch (err) {
    return res.json({ exists: false, error: err.message });
  }
};
