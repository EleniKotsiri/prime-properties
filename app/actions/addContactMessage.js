'use server';
import connectDB from "@/config/database";
import ContactMessage from "@/models/ContactMessage";

async function addContactMessage(previousState, formData) {
  await connectDB();

  const name = formData.get("name");
  const email = formData.get("email");
  const body = formData.get("body");

  if (!name || !email || !body) {
    return { error: "All fields are required" };
  }

  try {
    await ContactMessage.create({ name, email, body });

    return { submitted: true };
  } catch (error) {
    console.error("Error saving contact message:", error);

    return { error: "Failed to send message. Please try again later." };
  }
}

export default addContactMessage;