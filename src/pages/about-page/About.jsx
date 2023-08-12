import './About.css'
import { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";

export default function About() {

    const [aboutText, setAboutText] = useState([]);
    const [linkedIn, setLinkedIn] = useState('');

    useEffect(() => {
        fetchAbout();
    }, []);

    async function fetchAbout() {
        try {
            const response = await axios.get('http://localhost:3000/profile');
            setAboutText(response.data.about);
            setLinkedIn(response.data.link);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='about-container'>
            <a href={linkedIn} target="_blank" rel="noopener noreferrer" className='about-text-link'>
                <div className='about-text'>
                    {aboutText.map((about, index) => (
                        <p key={index}>{about}</p>
                    ))}
                </div>
            </a>
        </div>
    )
}
