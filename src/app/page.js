'use client'
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signIn, signOut } from 'next-auth/react';
import PopularPlaces from '@/components/client/destinations';
import Forfaits from '@/components/client/forfaits';
import { fetchDestinations } from "@/services/DestinationService";
import { FiltredfetchForfaits } from "@/services/ForfaitService";

const Home = () => {
  const { data: session } = useSession();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [forfaits, setForfaits] = useState([]);
  const [searchError, setSearchError] = useState('');

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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await FiltredfetchForfaits(selectedDestination);
      if (data.length === 0) {
        setSearchError('Aucun forfait trouvé pour cette destination.');
      } else {
        setForfaits(data);
        setSearchError('');
        document.getElementById('forfaits-section').scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching forfaits:', error);
      setSearchError('Une erreur s\'est produite lors de la recherche des forfaits.');
    }
  };

  return (
    <>
    
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>voyage | Landing, Corporate &amp; Business Template</title>
      <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicons/favicon-16x16.png" />
      <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicons/favicon.ico" />
      <link rel="manifest" href="assets/img/favicons/manifest.json" />
      <meta name="msapplication-TileImage" content="assets/img/favicons/mstile-150x150.png" />
      <meta name="theme-color" content="#ffffff" />
      <link href="assets/css/theme.css" rel="stylesheet" />

      <main className="main" id="top">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll" id="navbarSupportedContent">
          <div className="container">
            <a className="navbar-brand" href="index.html">
              <img className="d-inline-block" src="assets/img/gallery/logo.png" width={50} alt="logo" />
              <span className="fw-bold text-primary ms-2">voyage</span>
            </a>
            <form>
              {session ? (
                <Nav.Link onClick={() => signOut()}>
                  <LogoutIcon /> Se déconnecter
                </Nav.Link>
              ) : (
                <Nav.Link onClick={() => signIn()}>
                  <AccountCircleIcon /> Se connecter
                </Nav.Link>
              )}
            </form>
          </div>
        </nav>

        <section className="mt-7 py-0">
          <div className="bg-holder w-50 bg-right d-none d-lg-block" style={{ backgroundImage: "url(assets/img/gallery/hero-section-1.png)" }}></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 py-5 py-xl-5 py-xxl-7">
                <h1 className="display-3 text-1000 fw-normal">Let’s make a tour</h1>
                <h1 className="display-3 text-primary fw-bold">Discover the beauty</h1>
                <div className="pt-5">
                  <nav>
                    <div className="nav nav-tabs voyage-tabs" id="nav-tab" role="tablist">
                      <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        <i className="fas fa-map-marker-alt" />
                      </button>
                      <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        {" "}
                        <i className="fas fa-plane" />
                      </button>
                      <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">{" "}
<i className="fas fa-hotel" />
</button>
</div>
<div className="tab-content" id="nav-tabContent">
<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
<form className="row g-4 mt-5" onSubmit={handleSearch}>
<div className="col-sm-6 col-md-6 col-xl-5">
<div className="input-group-icon">
<label htmlFor="inputDestination" className="visually-hidden">
Destination
</label>
<select
className="form-control input-box form-voyage-control"
id="inputDestination"
value={selectedDestination}
onChange={(e) => setSelectedDestination(e.target.value)}
>
<option value="" disabled>Select Destination</option>
{destinations.map((destination) => (
<option key={destination.nom} value={destination.nom}>{destination.nom}</option>
))}
</select>
<span className="nav-link-icon text-800 fs--1 input-box-icon">
<i className="fas fa-map-marker-alt" />
</span>
</div>
</div>
<div className="col-sm-6 col-md-6 col-xl-5">
<div className="input-group-icon">
<input className="form-control input-box form-voyage-control" id="inputDate" type="date" />
<span className="nav-link-icon text-800 fs--1 input-box-icon">
<i className="fas fa-calendar" />
</span>
</div>
</div>
<div className="col-12 col-xl-10 col-lg-12 d-grid mt-6">
<button className="btn btn-secondary" type="submit">Search Packages</button>
</div>
</form>
</div>
</div>
</nav>
</div>
</div>
</div>
</div>
</section>
    <section className="py-0 overflow-hidden" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 px-0">
            <img className="img-fluid order-md-0 mb-4 h-100 fit-cover" src="assets/img/gallery/hero-section-2.png" alt="..." />
          </div>
          <div className="col-lg-6 px-0 bg-primary-gradient bg-offcanvas-right">
          <div className="mx-6 mx-xl-8 my-8">
                <div className="align-items-center d-block d-flex mb-5">
                  <img className="img-fluid me-3 me-md-2 me-lg-4" src="assets/img/icons/locations.png" alt="..." />
                  <div className="flex-1 align-items-center pt-2">
                    <h5 className="fw-bold text-light">Visit the greatest places</h5>
                  </div>
                </div>
                <div className="align-items-center d-block d-flex mb-5">
                  <img className="img-fluid me-3 me-md-2 me-lg-4" src="assets/img/icons/schedule.png" alt="..." />
                  <div className="flex-1 align-items-center pt-2">
                    <h5 className="fw-bold text-light">Make your own plans.</h5>
                  </div>
                </div>
                <div className="align-items-center d-block d-flex mb-5">
                  <img className="img-fluid me-3 me-md-2 me-lg-4" src="assets/img/icons/save.png" alt="..." />
                  <div className="flex-1 align-items-center pt-2">
                    <h5 className="fw-bold text-light">Save 50% on your next trip</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    </section>
    {searchError && <p className="text-danger">{searchError}</p>}
    <PopularPlaces />
    <section id="forfaits-section">
        <Forfaits forfaits={forfaits} />
      </section>
  </main>
</>
);
};

export default Home;
