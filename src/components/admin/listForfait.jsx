import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteForfait } from '@/services/ForfaitService'; // Assurez-vous d'importer le service approprié
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './style.css'; // Assurez-vous d'importer le fichier de style approprié
import { useRouter } from 'next/navigation'; // Correction de l'import

// Importer Image de next/image
import Image from 'next/image';

const ListForfait = ({ forfaits, isSidebarOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer le forfait O/N")) {
      deleteForfait(id)
        .then((res) => {
          console.log(res);
          if (isMounted) {
            router.reload(); 
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
        <Link href="/admin/forfaits/newForfait" style={{ textDecoration: 'none', color: 'aqua', fontSize: 14 }}>
          <AddCircleOutlineIcon /> Nouveau
        </Link>
      </Button>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Destination</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Date</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Durée</th>
<th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Prix</th>
<th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Description</th>
<th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Autres Détails</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {forfaits.map(forfait => (
            <tr key={forfait._id}>
              <td className="py-2 px-4 border-b border-gray-200">{forfait._id}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <div className="destination-info">
                { forfait.destination && forfait.destination.images && forfait.destination.images.length > 0 ? (
    forfait.destination.images.map((img, index) => (
        <Image
            key={index}
            src={img}
            alt="Image destination"
            width={50}
            height={50}
            className="image rounded"
        />
    ))
) : (
    <span>Image not available</span>
)}

             <p>ID: {forfait.destination && forfait.destination._id}</p>
                  <p>Nom: {forfait.destination && forfait.destination.nom}</p>
                </div>
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{forfait.date}</td>
              <td className="py-2 px-4 border-b border-gray-200">{forfait.duree}</td>
              <td className="py-2 px-4 border-b border-gray-200">{forfait.prix}</td>
              <td className="py-2 px-4 border-b border-gray-200">{forfait.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">{forfait.autresDetails}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <DeleteIcon onClick={() => handleDelete(forfait._id)} className="cursor-pointer text-red-500" />
                <Link href={`/admin/forfaits/UpdateForfait/${forfait._id}`}>
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

export default ListForfait;
