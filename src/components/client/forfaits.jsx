import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from './reservation/ReservationForm'; 

const Forfaits = () => {
    const [forfaits, setForfaits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedForfait, setSelectedForfait] = useState(null);
    const [showReservationForm, setShowReservationForm] = useState(false);

    useEffect(() => {
        const fetchForfaits = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/forfaits/pagination?page=1&limit=8');
                setForfaits(response.data.forfaits);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchForfaits();
    }, []);

    const handleReserverClick = (forfait) => {
        setSelectedForfait(forfait);
        setShowReservationForm(true);
    };

    const cardStyle = {
        border: 'none',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s'
    };

    const cardHoverStyle = {
        transform: 'translateY(-10px)'
    };

    const imgStyle = {
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        height: '200px',
        objectFit: 'cover'
    };

    const cardBodyStyle = {
        padding: '20px'
    };

    const cardTitleStyle = {
        fontSize: '1.25rem',
        marginBottom: '10px',
        fontWeight: 'bold'
    };

    const cardTextStyle = {
        marginBottom: '10px',
        color: '#6c757d'
    };

    const btnReserverStyle = {
        backgroundColor: 'orange',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        transition: 'background-color 0.3s, transform 0.3s'
    };

    const btnReserverHoverStyle = {
        backgroundColor: 'darkorange',
        transform: 'scale(1.05)'
    };

    return (
        <section id="testimonial">
            <div className="container">
                <div className="row">
                    {forfaits.map((forfait) => (
                        <div key={forfait._id} className="col-lg-3 col-md-6 mb-4">
                            <div
                                className="card h-100"
                                style={cardStyle}
                                onMouseEnter={(e) => e.currentTarget.style.transform = cardHoverStyle.transform}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                            >
                                <img className="card-img-top" style={imgStyle} src={forfait.destinationID.images} alt={forfait.destinationID.nom} />
                                <div className="card-body" style={cardBodyStyle}>
                                    <h4 className="card-title" style={cardTitleStyle}>{forfait.destinationID.nom}</h4>
                                    <p className="card-text" style={cardTextStyle}>{forfait.description}</p>
                                    <p className="card-text" style={cardTextStyle}>Date: {forfait.date}</p>
                                    <p className="card-text" style={cardTextStyle}>Durée: {forfait.duree} jours</p>
                                    <p className="card-text" style={cardTextStyle}>Prix: {forfait.prix} DT</p>
                                    <button
                                        className="btn btn-reserver"
                                        style={btnReserverStyle}
                                        onMouseEnter={(e) => e.currentTarget.style = { ...btnReserverStyle, ...btnReserverHoverStyle }}
                                        onMouseLeave={(e) => e.currentTarget.style = btnReserverStyle}
                                        onClick={() => handleReserverClick(forfait)}
                                    >
                                        Réserver
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showReservationForm && (
                <ReservationForm forfait={selectedForfait} onClose={() => setShowReservationForm(false)} />
            )}
        </section>
    );
};

export default Forfaits;
