import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularPlaces = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/destinations/pagination?page=1&limit=6');
                setDestinations(response.data.destinations);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="py-7 overflow-hidden" id="places">
            <div className="container bg-offcanvas-gray-right">
                <div className="row gx-2 mb-2">
                    <div className="col-12 col-md-12 col-lg-4">
                        <div className="bg-primary-gradient bg-offcanvas h-100">
                            <div className="row g-0 justify-content-end">
                                <div className="col-12">
                                    <div className="p-6 py-md-5 px-md-3 py-lg-8 text-light">
                                        <img
                                            className="mb-5"
                                            src="assets/img/icons/icon-location.svg"
                                            alt="..."
                                        />
                                        <h2 className="mb-2 text-light">Popular places</h2>
                                        <p>
                                            Enjoy the benefits of our packages to the
                                            <br className="d-none d-lg-block" />
                                            sites where our visitors have more fun.{" "}
                                            <br className="d-none d-lg-block" />
                                            Properly arranged with low costing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {destinations.map((destination, index) => (
                        <div key={index} className="col-sm-6 col-lg-4">
                            <div className="card card-span h-100 text-white">
                                <img
                                    className="img-fluid h-100 w-100"
                                    src={destination.images} // Assurez-vous que l'URL de l'image est correcte dans vos données
                                    height={375}
                                    alt={destination.nom}
                                />
                                <div className="card-img-overlay ps-0 d-flex flex-column justify-content-between bg-voyage-gradient">
                                    <div className="mt-auto px-4 mb-1">
                                        <h3 className="fs-1 fs-md-2 text-white">{destination.nom}</h3>
                                        <span className="text-light fs--1 me-1">
                                            <i className="fas fa-gift" />
                                        </span>
                                        <span className="text-light me-3">10 Packages</span>
                                    </div>
                                </div>
                                <a className="stretched-link" href="#!" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularPlaces;
