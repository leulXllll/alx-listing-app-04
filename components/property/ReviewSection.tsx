import { useState, useEffect } from "react";

// --- TYPE DEFINITION for a single review ---
interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
}

// --- PROPS DEFINITION for the component ---
interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
  // State for reviews, loading, and error status
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Do not fetch if propertyId is not available
    if (!propertyId) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint for property reviews
        const response = await fetch(`/api/properties/${propertyId}/reviews`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews for this property.");
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
  }, [propertyId]); // Effect depends on propertyId

  // --- RENDER LOGIC ---
  if (loading) {
    return <div className="mt-8 text-center"><p>Loading reviews...</p></div>;
  }

  if (error) {
    return <div className="mt-8 text-center"><p className="text-red-500">Error: {error}</p></div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Guest Reviews</h3>
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-2">
                <p className="font-semibold text-gray-900 dark:text-white mr-3">{review.author}</p>
                <p className="text-yellow-500" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">There are no reviews for this property yet.</p>
      )}
    </div>
  );
};

export default ReviewSection;
