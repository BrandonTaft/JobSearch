import {Link} from "react-router-dom";
import "../App.css"
function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/google-jobs" className="navbar-brand">
            My Google Jobs
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/google-jobs"} className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/portfolio"} className="nav-link">
                Check Portfolio
              </Link>
            </li>
          </div>
        </nav> 
/* <header id="header"> 
    hey
         
            <nav data-aos="zoom-out" data-aos-delay="800" class="navbar navbar-expand navbar-light">
                <div class="container header">
                    
                    <a class="navbar-brand" href="/">
                        <img src="assets/img/logo/logo.png" alt="sticky brand-logo" />
                    </a>
                    <div class="ml-auto"></div>
                    
                    <ul class="navbar-nav items">
                        <li class="nav-item">
                            <a class="nav-link scroll" href="#home">Home</a>
                        </li>
                        <li class="nav-item">
                        <Link to={"/portfolio"} className="nav-link">Check Portfolio</Link>
                        </li>
                        <li class="nav-item">
                        <a href="/google-jobs" className="navbar-brand">My Google Jobs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link scroll" href="#portfolio">Portfolio</a>
                        </li>
                        <li class="nav-item">
                        <Link to={"/google-jobs"} className="nav-link">Jobs</Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link scroll" href="#contact">Contact</a>
                        </li>
                    </ul>
                    
                    <ul class="navbar-nav icons">
                        <li class="nav-item">
                             <a href="#" class="nav-link" data-toggle="modal" data-target="#search">
                                <i class="fas fa-search"></i>
                            </a> 
                        </li>
                        <li class="nav-item social">
                            <a href="#" class="nav-link"><i class="fab fa-facebook-f"></i></a>
                        </li>
                        <li class="nav-item social">
                            <a href="#" class="nav-link"><i class="fab fa-twitter"></i></a>
                        </li> 
                    </ul>

                    
                    <ul class="navbar-nav toggle">
                        <li class="nav-item">
                             <a href="#" class="nav-link" data-toggle="modal" data-target="#menu"> 
                                <i class="fas fa-bars toggle-icon m-0"></i>
                          
                        </li>
                    </ul>
                </div>
            </nav>
        </header> */
    )
}
        export default Navbar