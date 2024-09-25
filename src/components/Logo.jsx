import React, { useState, useEffect } from 'react';

function Logo() {
  const [colors, setColors] = useState([]);
  const [visible, setVisible] = useState(true);

  const letters = ['t', 'o', 'd', 'o', 'l', 'i', 's', 't'];

  // Fonction pour générer une couleur aléatoire
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Mettre à jour les couleurs de chaque lettre et gérer la visibilité toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      const newColors = letters.map(() => getRandomColor());
      setColors(newColors);
      setVisible((prevVisible) => prevVisible); // Changer la visibilité
    }, 2000); // Changement toutes les 1 seconde

    return () => clearInterval(interval); // Nettoyage à la fin
  }, []);

  return (
    <div >
      <ul style={{
       
        fontOpticalSizing: "auto",
        fontWeight: "800",
        fontStyle: "large",
        fontSize:"60px",
        margin: "0", /* Supprime la marge par défaut */
        letterSpacing: "15px",
        listStyleType: "none",
        fontFamily: "Playpen Sans, cursive",
       
        transition: "opacity 0.5s ease",
        display:"flex",
        justifyContent:"center"
      }}>
        {letters.map((letter, index) => (
          <li
            key={index}
            style={{
              color: colors[index], // Appliquer une couleur aléatoire
              opacity: visible ? 1 : 0, // Gérer la visibilité (apparition/disparition)
              transition: "opacity 0.5s ease", // Transition douce pour l'apparition/disparition
            }}
          >
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logo;
