import React, { useState, useEffect, useMemo } from 'react'
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setCarouselIndex((carouselIndex + 1) % 3)
        }, 7000)
        return () => clearTimeout(timer)
    }, [carouselIndex])

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