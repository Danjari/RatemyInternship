import Image from 'next/image';

interface JobCardProps {
    name: string;
    title: string;
    location: string;
    description: string;
    employees: number;
    industry: string;
    reviews: number;
    logo?: string;
    stars: number;
  }
export default function JobCard({
  name,
  title,
  location,
  description,
  employees,
  industry,
  reviews,
  logo,
  stars,
} : JobCardProps) {

  return (
    <div className="max-w-md bg-gray-800 text-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex items-center">
        {/* Logo */}
        <div className="w-16 h-16 flex-shrink-0 mr-4">
          <Image src={logo || ""} alt={`${name} logo`} width={64} height={64} className="rounded-full" />
        </div>
        <div>
          {/* Name and Title */}
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Location and Industry */}
        <p className="text-gray-400 mb-2">{location} • {industry}</p>

        {/* Description */}
        <p className="text-gray-300 mb-4">{description}</p>

        {/* Employees, Reviews, and Stars */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <p>Employees: {employees}</p>
            <p>Reviews: {reviews}</p>
          </div>
          <div className="flex items-center">
            {[...Array(stars)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.809c.969 0 1.371 1.24.588 1.81l-3.081 2.23a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.54 1.118L10 13.748l-3.081 2.23c-.784.569-1.84-.197-1.54-1.118l1.18-3.63a1 1 0 00-.364-1.118L3.114 9.057c-.783-.57-.381-1.81.588-1.81h3.81a1 1 0 00.95-.69l1.18-3.63z" />
              </svg>
            ))}
            {/* Display remaining stars as empty */}
            {[...Array(5 - stars)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.317l1.481 4.556h4.792l-3.87 2.81 1.48 4.556L12 13.43l-3.883 2.809 1.482-4.556-3.872-2.81h4.793L12 4.317z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
