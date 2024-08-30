export async function requestMapboxToken(
  username = process.env.MAPBOX_USERNAME,
  accessToken = process.env.MAPBOX_ACCESS_TOKEN,
) {
  const url = `https://api.mapbox.com/tokens/v2/${username}?access_token=${accessToken}`;
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 59); // Set expiration to 59 minutes from now

  //
  const requestBody = {
    expires: expirationDate.toISOString(),
    scopes: ["styles:read", "fonts:read"],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Request failed with status ${response.status}: ${errorDetails}`,
    );
  }

  const data = await response.json();
  return data;
}
