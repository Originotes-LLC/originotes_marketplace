/* eslint-disable camelcase */
import "server-only";

import swell from "./server";

export const createSwellBuyer = async (
  id: string,
  email: string,
  firstName: string | null,
  lastName: string | null
) => {
  return await swell.post("/accounts", {
    clerk_id: id,
    email,
    first_name: firstName ?? "",
    last_name: lastName ?? "",
    email_optin: false,
    group: "originotes_buyers",
  });
};

export const updateSwellBuyer = async (
  email: string,
  first_name: string | null,
  last_name: string | null
) => {
  return await swell.put("/accounts/{id}", {
    email,
    first_name: first_name ?? "",
    last_name: last_name ?? "",
    group: "originotes_buyers",
  });
};

export const deleteSwellBuyer = async (id: string | undefined) => {
  if (!id)
    throw new Error(
      "No clerk id provided. Please ensure there is a clerk id provided to Swell."
    );
  const currentUser = await await swell.get("/accounts/", {
    clerk_id: id,
  });

  const { results, count } = currentUser;

  if (count === 1 && Array.isArray(results) && results.length > 0) {
    return await swell.delete("/accounts/{id}", {
      id: results[0].id,
    });
  } else {
    throw new Error("No user found with the clerk id provided");
  }
};
