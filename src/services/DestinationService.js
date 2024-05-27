
const DESTINATION_API = "/destinations/";


export const fetchDestinations = async () => {
  const res = await fetch(process.env.API_URL + DESTINATION_API, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const response = await res.json();
  return response;
}

export const fetchDestinationById = async (destinationId) => {
  const res = await fetch(process.env.API_URL + DESTINATION_API + `${destinationId}`, {
    method: 'GET'
  });
  const response = await res.json();
  return response;
}

export const deleteDestination = async (destinationId) => {
  const res = await fetch(process.env.API_URL + DESTINATION_API + `${destinationId}`, {
    method: 'DELETE'
  });
  const response = await res.json();
  return response;
}

export const addDestination = async (destination) => {
  const res = await fetch(process.env.API_URL + DESTINATION_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(destination),
  });
  const response = await res.json();
  return response;
}

export const editDestination = async (destination) => {
  const res = await fetch(process.env.API_URL + DESTINATION_API + `${destination._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(destination),
  });
  const response = await res.json();
  return response;
}
export const fetchDestinationImages = async (destinationID) => {
  try {
    const response = await axios.get(`${API_URL}/destinations/${destinationID}/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination images:', error);
    throw error;
  }
};
export const fetchDestinationPagination=async(page,limit)=> {
  const res = await
  fetch(process.env.API_URL+DESTINATION_API+`pagination?page=${page}&limit=${limit}`
  , { cache: 'no-store' })
  const response=await res.json()
  return response;
  }
