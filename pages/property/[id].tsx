import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";


interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
}

interface Property {
  id:string;
  name: string;
  location: string;
  price: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  reviews: Review[]; // Including reviews as part of the property
}

// --- REVIEW SECTION COMPONENT ---
// This component fetches and displays reviews for a given property
const ReviewSection = ({ propertyId }: { propertyId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint for reviews
        const response = await fetch(`https://api.example.com/properties/${propertyId}/reviews`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (err) {
         if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred while fetching reviews.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p className="text-center text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Reviews</h3>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
              <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
      )}
    </div>
  );
};


// --- PROPERTY DETAIL COMPONENT ---
// This component renders the detailed view of a property
const PropertyDetail = ({ property }: { property: Property }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden mb-6">
             <Image
                src={property.imageUrl}
                alt={`Image of ${property.name}`}
                layout="fill"
                objectFit="cover"
                className="bg-gray-200"
            />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{property.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{property.location}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white mt-4">${property.price.toLocaleString()} / night</p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{property.description}</p>

        <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Amenities</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map(amenity => <li key={amenity} className="text-gray-700 dark:text-gray-300">{amenity}</li>)}
            </ul>
        </div>

        <ReviewSection propertyId={property.id} />
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure we have an ID from the router before fetching
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch property with ID: ${id}`);
        }
        const data: Property = await response.json();
        setProperty(data);
      } catch (err) {
         if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // Dependency array ensures this runs when `id` changes

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-lg">Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-lg text-red-500">Error: {error}</p></div>;
  }

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-lg">Property not found.</p></div>;
  }

  return <PropertyDetail property={property} />;
}
