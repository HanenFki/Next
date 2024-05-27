import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const ReservationForm = ({ forfait, onClose }) => {
    const [nbrPersonne, setNbrPersonne] = useState(1);
    const [prixTotal, setPrixTotal] = useState(forfait.prix);
    const { data: session } = useSession();
    const utilisateurEmail = session?.user?.email;

    useEffect(() => {
        const updatePrixTotal = () => {
            setPrixTotal(forfait.prix * nbrPersonne);
        };
        updatePrixTotal();
    }, [nbrPersonne, forfait.prix]);

    const handleNbrPersonneChange = (e) => {
        setNbrPersonne(parseInt(e.target.value));
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        if (!utilisateurEmail) {
            alert("Vous devez être connecté pour faire une réservation.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/reservations', {
                utilisateurEmail,
                destinationID: forfait.destinationID,
                forfaitID: forfait._id,
                prixtot: prixTotal,
                nbpersonne: nbrPersonne
            });
            console.log('Réservation effectuée avec succès:', response.data);
            alert('Réservation confirmée');
            onClose();
        } catch (error) {
            console.error('Erreur lors de la réservation:', error.message);
        }
    };
    return (
        <div className="reservation-form-container">
            <div className="reservation-form">
                <h2>Réservation</h2>
                <form onSubmit={handleReservationSubmit}>
                    <div className="form-group">
                        <label>Destination:</label>
                        <span>{forfait.destinationID.nom}</span>
                    </div>
                    <div className="form-group">
                        <label>Nombre de personnes:</label>
                        <div className="input-group">
                            <button className="btn" type="button" onClick={() => setNbrPersonne(Math.max(1, nbrPersonne - 1))}>-</button>
                            <input className="form-control" type="number" value={nbrPersonne} onChange={handleNbrPersonneChange} />
                            <button className="btn" type="button" onClick={() => setNbrPersonne(nbrPersonne + 1)}>+</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Prix total:</label>
                        <input className="form-control" type="text" value={prixTotal} disabled />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Confirmer la réservation</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationForm;
