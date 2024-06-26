/* eslint-disable camelcase */
import "server-only";

import {
  createSwellBuyer,
  deleteSwellBuyer,
  updateSwellBuyer,
} from "@/lib/account";

import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    // Get the ID and type
    // const { id } = evt.data;
    const eventType = evt.type;

    // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    // console.log("Webhook body:", JSON.stringify(body, null, 2));

    // create your user in Swell
    switch (eventType) {
      case "user.created": {
        const id = evt.data.id;
        const firstName = evt.data.first_name;
        const lastName = evt.data.last_name;
        const emails = evt.data.email_addresses;

        if (!emails[0]?.email_address) {
          return new Response(
            "No email was provided or incorrect email. Please provide a valid email.",
            {
              status: 400,
            }
          );
        }
        const newSwellAccount = await createSwellBuyer(
          id,
          emails[0].email_address,
          firstName,
          lastName
        );

        if ("errors" in newSwellAccount) {
          throw new Error(
            `Error creating user in Swell: ${newSwellAccount?.errors?.email?.message}`
          );
        } else {
          return new Response("User created successfully!", {
            status: 200,
          });
        }
      }
      case "user.updated": {
        const firstName = evt.data.first_name;
        const lastName = evt.data.last_name;
        const emails = evt.data.email_addresses;

        if (!emails[0]?.email_address) {
          throw new Error(
            `No email was provided or incorrect email. Please provide a valid email.`
          );
        }
        const updatedSwellAccount = await updateSwellBuyer(
          emails[0].email_address,
          firstName,
          lastName
        );
        if ("errors" in updatedSwellAccount) {
          throw new Error(
            `Error updating user in Swell: ${updatedSwellAccount?.errors?.email?.message}`
          );
        } else {
          return new Response("User updated successfully!", {
            status: 200,
          });
        }
      }
      case "user.deleted": {
        const clerkId = evt.data.id;
        const deletedSwellAccount = await deleteSwellBuyer(clerkId);
        if ("errors" in deletedSwellAccount) {
          throw new Error(
            `Error deleting user in Swell: ${deletedSwellAccount?.errors?.email?.message}`
          );
        } else {
          return new Response("User deleted successfully!", {
            status: 200,
          });
        }
      }
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }
}
