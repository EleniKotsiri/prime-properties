import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/config/convertToSerializableObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams }) => {
  // get query values directly using next.js searchParams
  const { location, propertyType } = await searchParams;

  await connectDB();

  // Get properties that match those values
  // regex pattern for location
  const locationPattern = new RegExp(location, 'i'); // 'i' == case insensitive

  // Match it to all the location fields like street,city,state but also to name, description
  let query = {
    // $or from mongoose
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },

    ]
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i'); // 'i' == case insensitive
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);

  return (
    <>
    <section className="bg-blue-700 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
        <PropertySearchForm />
      </div>
    </section>
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        <Link href='/properties' className="flex items-center text-blue-500 mb-3 hover:underline">
          <FaArrowAltCircleLeft className="mr-2 mb-1"/> Back To Properties
        </Link>
        <h1 className="text-2xl mb-4">Search Results</h1>
        { properties.length === 0 ? (
          <p>No search results</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  )
}
export default SearchResultsPage