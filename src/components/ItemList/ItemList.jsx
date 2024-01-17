import Item from "../Item/Item"

const ItemList = ({ products }) => {
    return (
        <container class='container-grid' onClick={() => console.log('list')}>
            {
                products.map(product => {
                    return (
                        <Item key={product.id} {...product} />
                    )
                })
            }
        </container>
    )
}

export default ItemList