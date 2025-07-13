import { useState, useEffect } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define a type for your property data for type safety
interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  // State to store the list of properties
  const [properties, setProperties] = useState<Property[]>([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle any errors during data fetching
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch properties from the API
    const fetchProperties = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("https://api.example.com/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data: Property[] = await response.json();
        setProperties(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gray-50 dark:bg-black`}
    >
      <header className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white">
            Available Properties
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 dark:text-gray-400 mt-1">
            Find your next home
          </p>
      </header>

      <main className="p-4 sm:p-8">
        {loading && (
          <p className="text-center text-gray-500">Loading properties...</p>
        )}

        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                    <Image
                    src={property.imageUrl}
                    alt={`Image of ${property.name}`}
                    layout="fill"
                    objectFit="cover"
                    />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{property.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{property.location}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                    ${property.price.toLocaleString()} / night
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}