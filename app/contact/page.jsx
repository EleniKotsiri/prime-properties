"use client";
import { useEffect, useActionState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addContactMessage from "@/app/actions/addContactMessage";
import SubmitMessageButton from "@/components/SubmitMessageButton";

const TermsContactForm = () => {
  const { data: session } = useSession();
  // addContactMessage returns an object { submitted: true }
  const [state, formAction] = useActionState(addContactMessage, {});

  useEffect(() => {
    // the addContactMessage action, on error returns { error }
    if (state.error) toast.error(state.error);

    if (state.submitted) toast.success('Message sent successfully');

  }, [state]);

  // we get state.submitted from the action (addContactMessage returns an object { submitted: true })
  if (state.submitted) {
    return (
      <p className="text-green-500 mb-4">
        Your message has been sent.
      </p>
    );
  }

  return (
    session ? (
      <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-lg mt-10 md:max-w-2xl md:mt-14 xl:max-w-6xl">
        <h3 className="text-xl font-bold mb-6">Contact Us</h3>
        <form action={formAction}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="body"
              name="body"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      </div>
    ) : (
      <h2 className="text-xl font-bold ml-3 mt-6">You need to be logged in to contact us.</h2>
    )
  );
};
export default TermsContactForm;
