const FORFAIT_API = "/forfaits/";

export const fetchForfaits = async () => {
  try {
    // Récupérer les données des forfaits
    const res = await fetch(process.env.API_URL + FORFAIT_API, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const forfaits = await res.json();

    // Pour chaque forfait, récupérer les informations détaillées sur la destination
    const forfaitsAvecDestinations = await Promise.all(forfaits.map(async (forfait) => {
      // Récupérer les informations détaillées sur la destination
      const destinationRes = await fetch(process.env.API_URL + `/destinations/${forfait.destinationID}`);
      const destinationData = await destinationRes.json();

      return {
        ...forfait,
        destination: destinationData,
      };
    }));

    return forfaitsAvecDestinations;
  } catch (error) {
    console.error('Error fetching forfaits:', error);
    throw error;
  }
}
export const FiltredfetchForfaits = async (destination) => {
  try {
    // Récupérer les forfaits
    const res = await fetch(process.env.API_URL + '/forfaits', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const forfaits = await res.json();
    console.log('Forfaits récupérés:', forfaits);

    // Récupérer les données de la destination correspondante
    const destinationRes = await fetch(process.env.API_URL + `/destinations?nom=${destination}`, { cache: 'no-store' });
    if (!destinationRes.ok) {
      throw new Error('Failed to fetch destination data');
    }
    const destinationData = await destinationRes.json();
    console.log('Données de destination récupérées:', destinationData);

    // Filtrer les forfaits en fonction de la destination sélectionnée
    const forfaitsFiltres = forfaits.filter(forfait => forfait.destinationID === destinationData[0]._id);
    console.log('Forfaits filtrés:', forfaitsFiltres);

    // Retourner les forfaits filtrés avec les données de la destination correspondante
    return forfaitsFiltres.map(forfait => ({
      ...forfait,
      destination: destinationData[0] // Supposant qu'il n'y a qu'une seule destination correspondante
    }));
  } catch (error) {
    console.error('Error fetching forfaits:', error);
    throw error;
  }
};


export const fetchForfaitById = async (forfaitId) => {
  const res = await fetch(process.env.API_URL + FORFAIT_API + `${forfaitId}`, {
    method: 'GET'
  });
  const response = await res.json();
  return response;
}

export const deleteForfait = async (forfaitId) => {
  const res = await fetch(process.env.API_URL + FORFAIT_API + `${forfaitId}`, {
    method: 'DELETE'
  });
  const response = await res.json();
  return response;
}

export const addForfait = async (forfait) => {
  const res = await fetch(process.env.API_URL + FORFAIT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(forfait),
  });
  const response = await res.json();
  return response;
}

export const editForfait = async (forfait) => {
  const res = await fetch(process.env.API_URL + FORFAIT_API + `${forfait._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(forfait),
  });
  const response = await res.json();
  return response;
}

export const fetchForfaitPagination=async(page,limit)=> {
  const res = await
  fetch(process.env.API_URL+FORFAIT_API`pagination?page=${page}&limit=${limit}`
  , { cache: 'no-store' })
  const response=await res.json()
  return response;
  }

