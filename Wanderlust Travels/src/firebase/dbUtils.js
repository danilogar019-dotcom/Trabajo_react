import { db } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import forumData from '../assets/forum-data.json';
import { possibleDestinations } from '../data/possible_destinations';

import { blogPosts } from '../data/blog_data';

/**
 * Uploads local forum data to Firestore
 */
/**
 * Uploads local forum data to Firestore
 */
export const uploadInitialData = async () => {
    try {
        const forumRef = collection(db, 'forum');
        const snapshot = await getDocs(forumRef);
        if (snapshot.size > 0) return; // Strict: if any data exists, don't migrate

        console.log("Starting forum data migration...");
        for (const post of forumData) {
            await addDoc(forumRef, { ...post, createdAt: new Date() });
        }
        console.log("Forum migration finished!");
    } catch (error) {
        console.error("Error migrating forum data:", error);
    }
};

/**
 * Uploads local destination data to Firestore
 */
export const uploadDestinationsInitialData = async () => {
    try {
        const destRef = collection(db, 'destinations');
        const snapshot = await getDocs(destRef);
        if (snapshot.size > 0) return; // Strict: if any data exists, don't migrate

        console.log("Starting destinations migration...");
        for (const dest of possibleDestinations) {
            await addDoc(destRef, { ...dest, createdAt: new Date() });
            console.log(`Added destination: ${dest.title}`);
        }
        console.log("Destinations migration finished!");
    } catch (error) {
        console.error("Error migrating destinations:", error);
    }
};

/**
 * Uploads local blog data to Firestore
 */
export const uploadBlogInitialData = async () => {
    try {
        const blogRef = collection(db, 'blog');
        const snapshot = await getDocs(blogRef);
        if (snapshot.size > 0) return; // Strict: if any data exists, don't migrate

        console.log("Starting blog migration...");
        for (const post of blogPosts) {
            await addDoc(blogRef, { ...post, createdAt: new Date() });
            console.log(`Added blog post: ${post.title}`);
        }
        console.log("Blog migration finished!");
    } catch (error) {
        console.error("Error migrating blog posts:", error);
    }
};

const opinionsData = [
    {
        nombre: "Carlos Ruiz",
        titulo: "Increíble viaje a Japón",
        comentario: "La organización fue impecable. Desde los hoteles hasta las visitas guiadas, todo superó mis expectativas. ¡Repetiré sin duda!",
        estrellas: 5
    },
    {
        nombre: "Lucía Fernández",
        titulo: "Safari en Kenia",
        comentario: "Una experiencia transformadora. Ver a los animales tan cerca fue mágico. El equipo de Wanderlust estuvo pendiente de cada detalle.",
        estrellas: 5
    },
    {
        nombre: "Roberto Gómez",
        titulo: "Escapada a Islandia",
        comentario: "Las auroras boreales fueron impresionantes. El itinerario estaba muy bien equilibrado entre aventura y descanso.",
        estrellas: 4
    }
];

export const uploadOpinionsInitialData = async () => {
    try {
        const opinionsRef = collection(db, 'opiniones');
        const snapshot = await getDocs(opinionsRef);
        if (snapshot.size > 0) return;

        console.log("Starting opinions migration...");
        for (const opinion of opinionsData) {
            await addDoc(opinionsRef, { ...opinion, createdAt: new Date() });
            console.log(`Added opinion by: ${opinion.nombre}`);
        }
        console.log("Opinions migration finished!");
    } catch (error) {
        console.error("Error migrating opinions:", error);
    }
};
