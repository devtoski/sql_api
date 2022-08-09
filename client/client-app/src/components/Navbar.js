const Navbar = () => {
  return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <a className='navbar-brand ' href='/'>KnowledgeBase</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo02' aria-controls='navbarTogglerDemo02' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div id='navbarTogglerDemo02' className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                        <li className='nav-item'><a className='text-white nav-link' href='/'>Home</a></li>  
                        {/* if user */}
                        <li className='nav-item'><a className='text-white nav-link' href='/articles/add'>Add Article</a></li> 
                    </ul>

                    <ul className='nav navbar-nav navbar-right'>
                        <li className='nav-item'><a className='text-white nav-link' href='/users/logout'>Logout</a></li>
                        {/* else */}
                        <li className='nav-item'><a className='text-white nav-link' href='/users/register'>Register</a></li>
                        <li className='nav-item'><a className='text-white nav-link' href='/users/login'>Login</a></li>  
                    </ul>   
                </div>
            </div>
        </nav>
  )
}

export default Navbar
