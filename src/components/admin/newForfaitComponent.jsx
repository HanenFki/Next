"use client";
import { fetchDestinations } from "@/services/DestinationService";
import React, { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { addForfait } from "@/services/ForfaitService";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './style.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewForfait = () => {
     const router = useRouter();
  const [files, setFiles] = useState([]);
  const [destinationID, setDestinationID] = useState("");
  const [duree, setDuree] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [autresDetails, setAutresDetails] = useState("");
  const [validated, setValidated] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    const fetchDestinationsData = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinationsData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const newForfait = {
        destinationID,
        date,
        duree,
        prix,
        description,
        autresDetails,
        images: imageUrls,
      };
      try {
        await addForfait(newForfait);
        router.push("/admin/forfaits");
        router.refresh();
      } catch (error) {
        alert("Erreur ! Insertion non effectuée");
      }
    }
    setValidated(true);
  };

  // Server options for FilePond
  const serverOptions = {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dncgin9fj");
      data.append("public_id", file.name);

      axios
        .post("https://api.cloudinary.com/v1_1/dncgin9fj/image/upload", data)
        .then((response) => {
          const data = response.data;
          setImageUrls((prevUrls) => [...prevUrls, data.url]);
          load(data.url);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          error("Upload failed");
          abort();
        });
    },
  };

  const handleReset = () => {
    setDestinationID("");
    setDate("");
    setDuree("");
    setPrix("");
    setDescription("");
    setAutresDetails("");
    setFiles([]);
    setImageUrls([]);
    setValidated(false);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="form-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2>Ajout Forfait</h2>
          <Row className="custom-form-group">
            <Form.Group as={Col} md="6">
              <Form.Label className="custom-form-label">Destination *</Form.Label>
              <Form.Control
                className="custom-form-control"
                as="select"
                required
                value={destinationID}
                onChange={(e) => setDestinationID(e.target.value)}
              >
                <option value="">Choisir une destination</option>
                {destinations.map((destination) => (
                  <option key={destination._id} value={destination._id}>{destination.nom}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Choisissez une destination
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label className="custom-form-label">Date *</Form.Label>
              <Form.Control
                className="custom-form-control"
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
              <Form.Label className="custom-form-label">Durée *</Form.Label>
              <Form.Control
                className="custom-form-control"
                required
                type="number"
                placeholder="Durée"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Saisir Durée
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="custom-form-group">
            <Form.Group as={Col} md="6">
              <Form.Label className="custom-form-label">Prix *</Form.Label>
              <Form.Control
                className="custom-form-control"
                required
                type="number"
                placeholder="Prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Saisir Prix
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label className="custom-form-label">Description *</Form.Label>
              <Form.Control
                className="custom-form-control"
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Saisir Description
</Form.Control.Feedback>
</Form.Group>
</Row>
<Row className="custom-form-group">
<Form.Group as={Col} md="6">
<Form.Label className="custom-form-label">Autres Détails</Form.Label>
<Form.Control
className="custom-form-control"
type="text"
placeholder="Autres Détails"
value={autresDetails}
onChange={(e) => setAutresDetails(e.target.value)}
/>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label className="custom-form-label">Images</Form.Label>
<div style={{ width: "80%", margin: "auto", padding: "1%" }}>
<FilePond
               files={files}
               onupdatefiles={setFiles}
               allowMultiple={true}
               server={serverOptions}
               name="files"
             />
</div>
</Form.Group>
</Row>
<div className="d-flex justify-content-between">
<Button type="submit" className="custom-button">
Enregistrer
</Button>
<Button
           type="button"
           className="custom-button-warning"
           onClick={handleReset}>
Annuler
</Button>
</div>
</Form>
</div>
</div>
);
};

export default NewForfait;