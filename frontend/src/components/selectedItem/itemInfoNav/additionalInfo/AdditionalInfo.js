import { useSelector } from 'react-redux/es/hooks/useSelector';
import { motion } from 'framer-motion';

const AdditionalInfo = () => {
    const { selectedItemId } = useSelector((state) => state.item);

    if (!selectedItemId.productDescription) {
        return null;
    }

    const {
        productDescription: {
            additional_product_description: { weight, size, color, material }
        }
    } = selectedItemId;

    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <ul className='item__info'>
                <li className='info__catgrs-key'>
                    Weight: <span className='info__catgrs-value'>{weight}</span>
                </li>
                <li className='info__catgrs-key'>
                    Dimention: <span className='info__catgrs-value'>{size}</span>
                </li>
                <li className='info__catgrs-key'>
                    Colour: <span className='info__catgrs-value'>{color}</span>
                </li>
                <li className='info__catgrs-key'>
                    Material: <span className='info__catgrs-value'>{material}</span>
                </li>
            </ul>
        </motion.main>
    );
};

export default AdditionalInfo;
