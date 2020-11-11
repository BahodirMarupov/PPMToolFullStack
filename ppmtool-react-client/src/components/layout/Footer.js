import React from 'react'

function Footer() {
    return (
        <footer className="page-footer font-small pt-4">

            <div className="container mb-1 pb-0">

                <ul className="list-unstyled list-inline text-center">
                    <li className="list-inline-item">
                        <a className="btn-floating btn-dribbble mx-1" href=" https://telegram.me/bahodirmarupov">
                            <i className="fab fa-telegram"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-fb mx-1" href="https://www.facebook.com/bahodir.marupov.7">
                            <i className="fab fa-facebook-f"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-gplus mx-1" href="https://github.com/BahodirMarupov">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-li mx-1" href="https://www.linkedin.com/in/bahodir-marupov/">
                            <i className="fab fa-linkedin-in"> </i>
                        </a>
                    </li>
                </ul>

            </div>

            <div className="footer-copyright text-center py-3">© 2020 Bahodir Marupov
            </div>

        </footer>
    )
}

export default Footer;