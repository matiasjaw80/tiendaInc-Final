import { Link } from "react-router-dom"

const Item = ({ id, name, img, description, price}) => {

    const handleClick = (e) => {
        e.stopPropagation()
        console.log('item')
    }

    return (
        <div class='card' onClick={handleClick}>

            <img src={img} class='img' id={name}/>
            <h4>{description}</h4>
            <h4>${price}</h4>
            <Link  class='btn' to={`/detail/${id}`}>Ver Detalle</Link>
        </div>  
    )
}

export default Item