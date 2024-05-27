import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDestination } from '@/services/DestinationService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from 'react-bootstrap/Button';
import './style.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ListDestinations = ({ destinations, isSidebarOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer le produit O/N")) {
      deleteDestination(id)
        .then((res) => {
          console.log(res);
          if (isMounted) {
            router.reload(); // Rafraîchir la page
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${isSidebarOpen ? 'ml-64' : 'ml-0'}`} style={{ maxWidth: '90%', margin: 'auto' }}>
      <Button variant='dark' size="sm">
        <Link href="/admin/destinations/newDestination" style={{
          textDecoration: 'none',
          color: 'aqua',
          fontSize: 14,
        }}>
          <AddCircleOutlineIcon /> Nouveau
        </Link>
      </Button>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 id-cell">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Nom</th>
            <th className="py-2 px-6 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 description-cell">Description</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 image-cell">Images</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Attractions touristiques</th>
            <th className="py-2 px-6 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map(dest => (
            <tr key={dest._id}>
              <td className="py-2 px-4 border-b border-gray-200 id-cell">{dest._id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{dest.nom}</td>
              <td className="py-2 px-6 border-b border-gray-200 description-cell">{dest.description}</td>
              <td className="py-2 px-4 border-b border-gray-200 image-cell">
                {dest.images && dest.images.length > 0 ? (
                  dest.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt="Image destination"
                      width={900} 
                      height={100}
                      className="image rounded"
                    />
                  ))
                ) : (
                  <span>Image not available</span>
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{dest.attractionsTouristiques.join(', ')}</td>
              <td className="py-2 px-6 border-b border-gray-200">
                <DeleteIcon onClick={() => handleDelete(dest._id)} className="cursor-pointer text-red-500" />
                <Link href={`/admin/destinations/UpdateDestination/${dest._id}`}>
                  <EditOutlinedIcon className="cursor-pointer text-green-500 ml-2" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDestinations;
