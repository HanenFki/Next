'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchDestinations } from '@/services/DestinationService';
import { editForfait } from '@/services/ForfaitService';

const UpdateForfait = ({ forfait }) => {
  const [destinationID, setDestinationID] = useState("");
  const [destinationNom, setDestinationNom] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [duree, setDuree] = useState("");
  const [date, setDate] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [autresDetails, setAutresDetails] = useState("");
  const [validated, setValidated] = useState(false);
  const [destinationImage, setDestinationImage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (forfait) {
      setDestinationID(forfait.destinationID);
      setDate(forfait.date);
      setDuree(forfait.duree);
      setPrix(forfait.prix);
      setDescription(forfait.description);
      setAutresDetails(forfait.autresDetails);
    }

    // Fetch all destinations
    const fetchAllDestinations = async () => {
      const destinationsData = await fetchDestinations();
      setDestinations(destinationsData);

      // Find the current destination name and image
      const currentDestination = destinationsData.find(dest => dest._id === forfait.destinationID);
      if (currentDestination) {
        setDestinationNom(currentDestination.nom);
        setDestinationImage(currentDestination.images);
      }
    };

    fetchAllDestinations();
  }, [forfait]);

  const handleDestinationChange = (e) => {
    const selectedID = e.target.value;
    setDestinationID(selectedID);
    const selectedDestination = destinations.find(dest => dest._id === selectedID);
    if (selectedDestination) {
      setDestinationNom(selectedDestination.nom);
      setDestinationImage(selectedDestination.images);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const editedForfait = {
        _id: forfait._id,
        destinationID,
        date,
        duree,
        prix,
        description,
        autresDetails,
      };
      await editForfait(editedForfait)
        .then(res => {
          router.push("/admin/forfaits");
          router.refresh();
        })
        .catch(err => {
          console.log(err);
          alert("Erreur ! Modification non effectuée");
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Modification Forfait</h2>
        <div className="container w-100 d-flex justify-content-center">
          <div>
            <div className='form mt-3'>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Destination *</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    value={destinationID}
                    onChange={handleDestinationChange}
                  >
                    <option value="">Choisir une destination</option>
                    {destinations.map((destination) => (
                      <option key={destination._id} value={destination._id}>
                        {destination.nom}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Choisir une destination
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Date *</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir Date
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Durée *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Durée"
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir Durée
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Prix *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir Prix
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir Description
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Autres Détails</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Autres Détails"
                    value={autresDetails}
                    onChange={(e) => setAutresDetails(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Image de la Destination</Form.Label>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    {destinationImage && <img src={destinationImage} alt="Destination" style={{ width: "100%" }} />}
                  </div>
                </Form.Group>
              </Row>
            </div>
          </div>
        </div>

        <Button type="submit">Valider</Button>
      </Form>
    </div>
  );
};

export default UpdateForfait;
