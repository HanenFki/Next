"use client";
import { useEffect, useState } from 'react';
import ListDestinations from '@/components/admin/listDestination';
import { fetchDestinations } from "@/services/DestinationService";

const DestinationPage = () => {
  const [destinations, setDestinations] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchData();
  }, []);

  return <ListDestinations destinations={destinations} />;
};

export default DestinationPage;