import { useState } from "react";
import "./card.css";

const Card =({imagem, titulo, subtitulo}) => {
    <section class="square">
        <img src={imagem} alt={titulo}></img>
        <h1 class="titulo">{titulo}</h1>
        <p class="subtitulo">{subtitulo}</p>
    </section>
};

export default Card;