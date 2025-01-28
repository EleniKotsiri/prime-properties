'use server';
import PropertyCard from "@/components/PropertyCard";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  // Get user session
  const { userId } = await getSessionUser();

  // Get user bookmarks
  // here we can make one database query by using Model.populate
  const { bookmarks } = await User.findById(userId)
    .populate('bookmarks');

  return (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        <h1 className="text-2xl mb-4">
          Saved Properties
        </h1>
        { bookmarks.length === 0 ? (
          <p>No saved properties.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              { bookmarks.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          )
        }
      </div>
    </section>
  )
}
export default SavedPropertiesPage;