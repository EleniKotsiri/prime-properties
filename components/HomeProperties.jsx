import Link from "next/link";
import PropertyCard from "./PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";


const HomeProperties = async () => {
  // connect to db
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 }) // bring the most recently created
    .limit(3) // show 3 of them
    .lean() // bring them as plain javascript objects
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p> No properties found. </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {recentProperties.map((property) => {
                return <PropertyCard key={property._id} property={property} />;
              })}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center rounded-xl px-6 py-4 hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
