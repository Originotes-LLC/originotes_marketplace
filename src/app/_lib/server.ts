import "server-only";

import swell from "swell-node";

const storeId = process.env.SWELL_STORE_ID;
const secretKey = process.env.SWELL_SECRET_KEY;

if (!storeId || !secretKey) {
  throw new Error(
    "Please add SWELL_STORE_ID and/or SWELL_SECRET_KEY from Swell Dashboard to your local .env file"
  );
}

swell.init(storeId, secretKey);

export default swell;
