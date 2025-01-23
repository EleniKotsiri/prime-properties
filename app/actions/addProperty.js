'use server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache"; // updates cache after submition
import { redirect } from "next/navigation"; // redirect after submitting
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  // Connect to database
  await connectDB();

  // Get session user
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Access all values from amenities and images
  const amenities = formData.getAll('amenities');
  const images = formData
    .getAll('images')
    .filter((image) => image.name !== '');

  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };

  // Loop over the image files and convert them to base64
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString('base64');

    // Make request to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: 'primeproperties'
    });
    
    // Add each image to imageUrls
    imageUrls.push(result.secure_url);
  }
  // Add all fixed images to propertyData and then submit to the database
  propertyData.images = imageUrls;


  // Create new property in database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Purge cached data and redirect to the property's page
  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);

}

export default addProperty