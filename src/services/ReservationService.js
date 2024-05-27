const RESERVATION_API = "/reservations/";

export const fetchReservations = async () => {
  try {
    // Récupérer les données des réservations
    const res = await fetch(process.env.API_URL + '/reservations', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const reservations = await res.json();

    // Pour chaque réservation, récupérer les informations détaillées sur la destination et le forfait
    const reservationsAvecDetails = await Promise.all(reservations.map(async (reservation) => {
      // Récupérer les informations détaillées sur la destination
      const destinationRes = await fetch(process.env.API_URL + `/destinations/${reservation.destinationID}`);
      const destinationData = await destinationRes.json();

      // Récupérer les informations détaillées sur le forfait
      const forfaitRes = await fetch(process.env.API_URL + `/forfaits/${reservation.forfaitID}`);
      const forfaitData = await forfaitRes.json();

      return {
        ...reservation,
        destination: destinationData,
        forfait: forfaitData,
      };
    }));

    return reservationsAvecDetails;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
}
export const fetchReservationById = async (reservationId) => {
    const res = await fetch(process.env.API_URL + RESERVATION_API + `${reservationId}`, {
        method: 'GET'
    });
    const response = await res.json();
    return response;
}

export const deleteReservation = async (reservationId) => {
    const res = await fetch(process.env.API_URL + RESERVATION_API + `${reservationId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    return response;
}

export const addReservation = async (reservation) => {
    const res = await fetch(process.env.API_URL + RESERVATION_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
    });
    const response = await res.json();
    return response;
}

export const editReservation = async (reservation) => {
    const res = await fetch(process.env.API_URL + RESERVATION_API + `${reservation._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
    });
    const response = await res.json();
    return response;
}
