import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="row">

                <div>
                    <img src="/src/assets/sm.png" style={{ width: '200px', height: '40px' }} />
                </div>

                <ul>
                    <li><a>Contact us</a></li>
                    <li><a>Our Services</a></li>
                    <li><a>Privacy Policy</a></li>
                    <li><a>Terms & Conditions</a></li>
                    <li><a>Career</a></li>
                </ul>

                <span>Copyright © 2023 - All rights reserved</span>

            </div>
        </div>

    )
}

export default Footer