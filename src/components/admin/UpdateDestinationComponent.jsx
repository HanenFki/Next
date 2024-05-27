'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { editDestination } from '@/services/DestinationService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateDestination = ({ destination }) => {
  const [files, setFiles] = useState([]);
  
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [attractionsTouristiques, setAttractionsTouristiques] = useState("");
  const [images, setImage] = useState("");
  const [validated, setValidated] = useState(false);

  const router = useRouter(); // Utilisation de useRouter

  useEffect(() => {
    setNom(destination.nom);
    setDescription(destination.description);
    setAttractionsTouristiques(destination.attractionsTouristiques);
    setImage(destination.images);
    setFiles([
      {
        source: destination.images,
        options: { type: 'local' }
      }
    ]);
  }, [destination]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const editedDestination = {
        _id: destination._id,
        nom,
        description,
        attractionsTouristiques,
        images,
      };
      await editDestination(editedDestination)
        .then(res => {
          router.push("/admin/destinations");
          router.refresh();
        })
        .catch(error => {
          console.log(error);
          alert("Erreur ! Modification non effectuée");
        });
    }
    setValidated(true);
  };

  const serverOptions = () => {
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'ml_default');
        data.append('cloud_name', 'dncgin9fj');
        data.append('public_id', file.name);
        axios.post('https://api.cloudinary.com/v1_1/dncgin9fj/image/upload', data)
            .then((response) => response.data)
            .then((data) => {
                console.log(data);
                setImage(data.url); // Mettre à jour l'état de l'image avec l'URL téléchargée
                load(data);
            })
            .catch((err) => {
                console.error('Error uploading file:', err);
                error('Upload failed');
                abort();
            });
    },
    };
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Modification Destination</h2>
        <div className="container w-100 d-flex justify-content-center">
          <div>
            <div className='form mt-3'>
              <Row className="mb-2">
                <Form.Group as={Col} md="6" >
                  <Form.Label >Nom *</Form.Label>
                  <Form.Control
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
                  <Form.Label>Attractions Touristiques *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Attractions Touristique"
                      value={attractionsTouristiques}
                      onChange={(e) => setAttractionsTouristiques(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Attractions Touristique Incorrecte
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Image</Form.Label>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond
                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      server={serverOptions()}
                      name="file"
                    />
                  </div>
                </Form.Group>
              </Row>
            </div>
          </div>
        </div>

        <Button type="submit">Valider</Button>
      </Form>
    </div>
  )
}
export default UpdateDestination;