import React, { useState, useEffect} from 'react'
import './Carousel.css'

type Props = {
    children: React.ReactChild[];
}

const Carousel: React.FC<Props> = ({children}: Props) => {
    const [carouselIndex, setCarouselIndex] = useState(0)

    var arr = []
    for (let i = 0; i < children.length; i++) {
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
            {children[carouselIndex]}
            <div className="controllers">
                {arr}
            </div>
        </div>
    )
}

export default Carousel