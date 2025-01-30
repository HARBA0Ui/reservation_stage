import prisma from "../db/prisma.js"; 

export const createReservation = async (req, res) => {
    try {
        const {
            nom,
            prenom,
            tel,
            direction,
            datedeb,
            datefin,
            typeAcces,
            materiels, // This should be an array of strings
            disposition,
            participants,
            raison
        } = req.body;

        // Ensure materiels is an array of valid enum values
        const validMateriels = materiels.map((materiel) => materiel.toUpperCase());

        const reservation = await prisma.reservation.create({
            data: {
                nom,
                prenom,
                tel,
                direction,
                datedeb: new Date(datedeb),
                datefin: new Date(datefin),
                typeAcces,
                materiels: validMateriels, // Map the materiels to valid enum values
                disposition,
                participants,
                raison,
            }
        });

        res.status(201).json({ message: "Réservation créée avec succès", reservation });
    } catch (err) {
        console.error("Erreur lors de la création :", err);
        res.status(500).json({ message: "Erreur lors de la création de la réservation" });
    }
};

export const removeReservation = async (req, res) => {
    try {
        const { id } = req.body; 

        const reservation = await prisma.reservation.delete({
            where: { id }
        });

        res.status(200).json({ message: "Réservation supprimée avec succès", reservation });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).json({ message: "Erreur lors de la suppression de la réservation" });
    }
};


export const getReservations = async (req, res) => {
    try {
        const reservations = await prisma.reservation.findMany();
        console.log("reservation: ", reservations)
        res.status(200).json(reservations);
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations :", err);
        res.status(500).json({ message: "Erreur lors de la récupération des réservations" });
    }
};