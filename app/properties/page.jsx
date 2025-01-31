import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams }) => {
  // destructuring with a default value
  const { page = 1, pageSize = 9 } = await searchParams;
  
  // connect to db
  await connectDB();

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const showPagination = total > pageSize;
  
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  return (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {properties.length === 0 ? (
          <p> No properties found. </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((property) => {
              return <PropertyCard key={property._id}  property={property}/>
            })}
          </div>
        )}
        {showPagination && 
          <Pagination currentPage={parseInt(page)} pageSize={pageSize} totalItems={total} />
        }
      </div>
    </section>
  );
};
export default PropertiesPage;
