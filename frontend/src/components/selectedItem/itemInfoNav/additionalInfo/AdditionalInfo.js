import { useSelector } from 'react-redux/es/hooks/useSelector';

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
        <ul className='item__info'>
            <li className='info__catgrs-key'>
                Weight: <span className='info__catgrs-value'>{weight} gram</span>
            </li>
            <li className='info__catgrs-key'>
                Dimention: <span className='info__catgrs-value'>{size} </span>
            </li>
            <li className='info__catgrs-key'>
                Colour: <span className='info__catgrs-value'>{color}</span>
            </li>
            <li className='info__catgrs-key'>
                Material: <span className='info__catgrs-value'>{material}</span>
            </li>
        </ul>
    );
};

export default AdditionalInfo;
