<Card style={{ width: '18rem' }} id={item.id}>
    <Card.Body className='itemCounterText'>
        <Card.Title className="">Nombre: {item.nombre}</Card.Title>
        <Card.Text>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {Dropdown Button}
                </Dropdown.Toggle>
                    
                <Dropdown.Menu>
                {colores.map(function (color) {
                        return <Dropdown.Item value={color}>{color}</Dropdown.Item>
                })}
                </Dropdown.Menu>
            </Dropdown>
        </Card.Text>
        <Card.Text>Descripcion: {item.descripcion}</Card.Text>
        <Card.Text>Talle: {item.talle}</Card.Text>
        <Card.Img variant="top" src={item.img} />
        {item.stock === 0 ? <p className="itemCounter">Articulo sin stock!</p> : <ItemCounter item={item} />}
    </Card.Body>
</Card>