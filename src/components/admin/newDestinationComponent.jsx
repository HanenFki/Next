"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addDestination } from "@/services/DestinationService";
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

const NewDestination = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [attractionsTouristiques, setAttractionsTouristiques] = useState("");
  const [validated, setValidated] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const newDestination = {
        nom,
        description,
        attractionsTouristiques: attractionsTouristiques.split(","),
        images: imageUrls,
      };
      try {
        await addDestination(newDestination);
        router.push("/admin/destinations");
        router.refresh();
      } catch (error) {
        alert("Erreur ! Insertion non effectuée");
      }
    }
    setValidated(true);
  };

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
    setNom("");
    setDescription("");
    setAttractionsTouristiques("");
    setFiles([]);
    setImageUrls([]);
    setValidated(false);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="form-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2>Ajout Destination</h2>
          <Row className="custom-form-group">
            <Form.Group as={Col} md="6">
              <Form.Label className="custom-form-label">Nom *</Form.Label>
              <Form.Control
                className="custom-form-control"
                required
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Saisir Nom Destination
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
              <Form.Control.Feedback type="invalid">
                Saisir Description
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="custom-form-group">
            <Form.Group as={Col} md="6">
              <Form.Label className="custom-form-label">
                Attractions Touristiques *
              </Form.Label>
              <Form.Control
                className="custom-form-control"
                required
                type="text"
                placeholder="Attractions Touristiques"
                value={attractionsTouristiques}
                onChange={(e) => setAttractionsTouristiques(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Saisir Attractions Touristiques
              </Form.Control.Feedback>
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
              onClick={handleReset}
            >
              Annuler
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewDestination;
