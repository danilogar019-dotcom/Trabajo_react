import { db } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import forumData from '../assets/forum-data.json';

/**
 * Uploads local forum data to Firestore
 * This will NOT duplicate data if already exists (checks by title)
 */
export const uploadInitialData = async () => {
    try {
        console.log("Starting data migration...");
        const forumRef = collection(db, 'forum');
        
        // Get existing docs to avoid duplicates
        const snapshot = await getDocs(forumRef);
        const existingTitles = snapshot.docs.map(doc => doc.data().title);

        for (const post of forumData) {
            if (!existingTitles.includes(post.title)) {
                await addDoc(forumRef, {
                    ...post,
                    likes: post.likes || 0,
                    date: post.date || new Date().toLocaleDateString(),
                    createdAt: new Date()
                });
                console.log(`Added: ${post.title}`);
            } else {
                console.log(`Skipped (already exists): ${post.title}`);
            }
        }
        console.log("Migration finished successfully!");
    } catch (error) {
        console.error("Error migrating data:", error);
    }
};
