import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import mongoose from "mongoose";

export async function action({ request, params }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  const eventDelete = await mongoose.models.Event.findById(params.eventId);

  if (eventDelete.User.id != request.user.id) {
    return redirect(`/events/${params.eventId}`);
  }

  await eventDelete.remove();

  return redirect("/events");
}