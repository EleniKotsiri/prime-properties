'use server';
import cloudinary from "@/config/cloudinary";
// import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found");

  // Verify Ownership
  if(property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // Delete images from cloudinary
  // Extract public ID from image URLs
  // https://res.cloudinary.com/elena-dev/image/upload/v1737648643/primeproperties/nkeovt5slzxopv5vi3jq.jpg and we want the last part 'nkeovt5slzxopv5vi3jq'
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');

    return parts.at(-1).split('.').at(0);
  });
  // Delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('primeproperties/' + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath('/', 'layout'); 
}

export default deleteProperty;