"use client";
import { useEffect, useState } from 'react';

import { fetchForfaits } from "@/services/ForfaitService";
import ListForfait from '@/components/admin/listForfait';

const ForfaitPage = () => {
  const [forfaits, setForfaits] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchForfaits();
        setForfaits(data);
      } catch (error) {
        console.error('Error fetching forfaits:', error);
      }
    };

    fetchData();
  }, []);

  return <ListForfait forfaits={forfaits} />;
};

export default ForfaitPage;