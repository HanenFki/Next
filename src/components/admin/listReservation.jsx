import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteReservation, fetchReservations } from '@/services/ReservationService';

const ListReservations = ({ isSidebarOpen }) => {
  const [reservations, setReservations] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    fetchReservations()
      .then(setReservations)
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer la réservation ?")) {
      deleteReservation(id)
        .then(() => {
          if (isMounted) {
            router.reload();
          }
        })
        .catch(error => {
          console.error('Error deleting reservation:', error);
        });
    }
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${isSidebarOpen ? 'ml-64' : 'ml-0'}`} style={{ maxWidth: '90%', margin: 'auto' }}>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Utilisateur</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Destination</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Dates de voyage</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Prix total</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Nombre de personnes</th>

          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation._id}>
              <td className="py-2 px-4 border-b border-gray-200">{reservation._id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{reservation.utilisateurEmail}</td>
              <td className="py-2 px-4 border-b border-gray-200">{reservation.destination?.nom || 'Non spécifié'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{reservation.forfait?.date || 'Non spécifié'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{reservation.prixtot}</td>
              <td className="py-2 px-4 border-b border-gray-200">{reservation.nbpersonne}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListReservations;
