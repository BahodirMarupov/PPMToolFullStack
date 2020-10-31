import React from 'react'

function Footer() {
    return (
        <footer class="page-footer font-small pt-4">

            <div class="container mb-1 pb-0">

                <ul class="list-unstyled list-inline text-center">
                    <li class="list-inline-item">
                        <a class="btn-floating btn-fb mx-1" href="https://www.facebook.com/bahodir.marupov.7">
                            <i class="fab fa-facebook-f"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-gplus mx-1" href="https://github.com/BahodirMarupov">
                            <i class="fab fa-github"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-li mx-1" href="https://www.linkedin.com/in/bahodir-marupov/">
                            <i class="fab fa-linkedin-in"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-dribbble mx-1">
                            <i class="fab fa-dribbble"> </i>
                        </a>
                    </li>
                </ul>

            </div>

            <div class="footer-copyright text-center py-3">© 2020 Bahodir Marupov
            </div>

        </footer>
    )
}

export default Footer;