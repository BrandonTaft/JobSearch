import {Link} from "react-router-dom";
import "../css/navbar.module.css";
import { NavDropdown,Nav } from 'react-bootstrap';
 

function Navbar(){
    return(
        // <nav className="navbar navbar-expand navbar-dark bg-dark">
        //   <a href="/google-jobs" className="navbar-brand">
        //     My Google Jobs
        //   </a>
        //   <div className="navbar-nav mr-auto">
        //     <li className="nav-item">
        //       <Link to={"/google-jobs"} className="nav-link">
        //         Jobs
        //       </Link>
        //     </li>
        //     <li className="nav-item">
        //       <Link to={"/portfolio"} className="nav-link">
        //         Check Portfolio
        //       </Link>
        //     </li>
        //   </div>
        // </nav> 
        <Navbar bg="light" expand="lg">
  
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  
</Navbar>

    )
}
        export default Navbar