import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs';

export function Navbar () {
    return (
    <NavbarBs className='bg-white shadow-sm sb-3'>
        <Container>
            <Nav className='me-auto'>
                <Nav.Link to='/' as={NavLink}>Home</Nav.Link>
                <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
                <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
            </Nav>
            <Button style={{width: "3rem", height:"3rem", position:"relative"}} variant="outline-primary" className='rounded-circle'>
                <BsCart4 />
                <div className='rounded-circle bg-danger d-flex justify-content-center aling-items-center'>3</div>
            </Button>
        </Container>
    </NavbarBs>
    )
}