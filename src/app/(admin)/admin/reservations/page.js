"use client";
import { useEffect, useState } from 'react';
import ListReservations from '@/components/admin/listReservation';
import { fetchReservations} from "@/services/ReservationService";

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchData();
  }, []);

  return <ListReservations reservations={reservations} />;
};

export default ReservationPage;