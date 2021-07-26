import React, { useState } from 'react'
import './Carousel.css'
import { CSSTransition } from 'react-transition-group';


const Carousel = props => {
    const [carouselIndex, setCarouselIndex] = useState(0)

    var arr = []
    for (let i = 0; i < props.children.length; i++) {
        arr.push(
            <button className={`controller${carouselIndex === i ? ' active' : ''}`}
                onClick={() => setCarouselIndex(i)}
            ></button>
        )
    }

    return (
        <div className="Carousel">
            {props.children[carouselIndex]}
            <div className="controllers">
                {arr}
            </div>
        </div>
    )
}

export default Carousel