import Header from '../header/Header';
import Footer from '../footer/Footer';

const MainPage = () => {
    return (
        <>
            <Header line={true} />
            <div style={{width: "1250px", margin: '50px auto'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iusto repellendus perspiciatis harum cum eius
                labore odio non nam esse, voluptates dicta amet? Rem suscipit doloremque necessitatibus, dolore itaque
                repellat.
            </div>
            <Footer />
        </>
    );
};

export default MainPage;
