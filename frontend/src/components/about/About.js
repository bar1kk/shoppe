import './about.scss';
import jewelry1 from '../../assets/images/about/1.jpg';
import jewelry2 from '../../assets/images/about/2.jpg';
import jewelry3 from '../../assets/images/about/3.webp';

const About = () => {
    return (
        <div className='about'>
            <div className='about__wrapper'>
                <h2 className='about__tittle'>About</h2>
                <div className='about__description'>Who we are and why we do what we do!</div>

                <div className='about__content-wrapper-vertical'>
                    <p className='about__content italic'>
                        A brand created over 25 years by Ukrainian women for women. With understanding, respect and
                        boundless love. An innovative company whose main goal has always been to create more than simple
                        jewelry - each product from SHOPPE was supposed to become that special tool, the key to
                        revealing a woman's individuality, dreams and values.
                    </p>
                    <img src={jewelry1} alt='example of jewerly' />
                </div>
                <div className='about__content-wrapper-vertical'>
                    <p className='about__content'>
                        SHOPPE is a brand with a Ukrainian soul, values and dignity. Despite everything, we will not
                        deviate from our mission — to bring inspiration to women, to talk about important social topics,
                        to work with faith in Ukraine and Women. And to remind millions of women every day that they are
                        a real value.
                    </p>
                    <img src={jewelry2} alt='jewelry collage' />
                </div>

                <div className='about__conent-wrapper-horizontal'>
                    <p className='about__content'>
                        At the very beginning of its existence, SHOPPE received the title of "The First Diamond Brand of
                        Ukraine", offering its customers the first jewelry with transparent diamonds in white gold, as
                        well as products with black and cognac diamonds. We continue the path of innovators, being the
                        first on the Ukrainian jewelry market to offer new design and technological solutions in the
                        manufacture of jewelry.
                    </p>

                    <img src={jewelry3} alt='jewelry on the neck' />
                </div>
                <div className='about__content-wrapper-vertical'>
                    <p className='about__content'>
                        We are proud of our history and achievements, but we are not going to stop there. We are
                        constantly developing, improving and creating new products. We are not afraid to experiment. We
                        are not afraid to make mistakes. We are not afraid to be different. <br /><br />
                        <span>We are not afraid to be ourselves.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
