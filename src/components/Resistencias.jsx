import React, { useState } from 'react';
import './resistencias.css'

const bandas = {
    negro: 0,
    marron: 1,
    rojo: 2,
    naranja: 3,
    amarillo: 4,
    verde: 5,
    azul: 6,
    violeta: 7,
    gris: 8,
    blanco: 9
};

const bandasMuiltiplicador = {
    negro: 1,
    marron: 10,
    rojo: 100,
    naranja: 1000,
    amarillo: 10000,
    verde: 100000,
    azul: 1000000,
    violeta: 10000000,
    gris: 100000000,
    blanco: 1000000000,
    oro: 0.1,
    plata: 0.01
};

const bandasTolerancia = {
    marron: '±1%',
    rojo: '±2%',
    oro: '±5%',
    plata: '±10%',
    sin_banda: '±20%',
};

const Resistencias = () => {
    const [banda1, setBanda1] = useState('negro');
    const [banda2, setBanda2] = useState('negro');
    const [banda3, setBanda3] = useState('negro');
    const [banda4, setBanda4] = useState('oro');

    const obtenerResistencia = () => {
        const valor1 = bandas[banda1];
        const valor2 = bandas[banda2];
        const multiplicador = bandasMuiltiplicador[banda3];
        const valorResistencia = ((valor1 * 10) + valor2) * multiplicador;
        const tolerancia = bandasTolerancia[banda4];

        return `${valorResistencia}Ω ${tolerancia}`;
    };

    return (
        <div className="contenedor-resistencias">
            <h1>RESISTENCIAS REACT PWA</h1>
            <img src="https://sdindustrial.com.mx/wp-content/uploads/2022/09/codigos-colores-resistencias.png.webp" alt="Resistor" className="img-resistencia" />

            <div className="contenedor-bandas">
                <div className="contenedor-input">
                    <label>Banda 1</label>
                    <select value={banda1} onChange={(e) => setBanda1(e.target.value)} className={banda1}>
                        {Object.keys(bandas).map((color) => (
                            <option key={color} value={color} >
                                {color} <span>{`${bandas[color]}`}</span>
                            </option>
                        ))}
                    </select>
                </div>

                <div className="contenedor-input">
                    <label>Banda 2</label>
                    <select value={banda2} onChange={(e) => setBanda2(e.target.value)} className={banda2}>
                        {Object.keys(bandas).map((color) => (
                            <option key={color} value={color}>
                                {color} <span>{`${bandas[color]}`}</span>
                            </option>
                        ))}
                    </select>
                </div>

                <div className="contenedor-input">
                    <label>(Multiplicador) Banda 3</label>
                    <select value={banda3} onChange={(e) => setBanda3(e.target.value)} className={banda3}>
                        {Object.keys(bandasMuiltiplicador).map((color) => (
                            <option key={color} value={color} >
                                {color} <span>{`x Ω${bandasMuiltiplicador[color]}`}</span>
                            </option>
                        ))}
                    </select>
                </div>

                <div className="contenedor-input">
                    <label>(Tolerancia) Banda 4</label>
                    <select value={banda4} onChange={(e) => setBanda4(e.target.value)} className={banda4}>
                        {Object.keys(bandasTolerancia).map((color) => (
                            <option key={color} value={color} >
                                {color} <span>{`${bandasTolerancia[color]}`}</span>
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <h2>Valor de Resistencia: {obtenerResistencia()}</h2>
            <h3>Erick Saul Rivera Chagoya - IDGS 1002</h3>
        </div>
    );
}

export default Resistencias;
