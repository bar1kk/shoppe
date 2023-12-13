import { useSelector } from "react-redux/es/hooks/useSelector";


const AdditionalInfo = () => {
    const { selectedItemId } = useSelector(state => state.item);

    if (!selectedItemId.info) {
        return null;
    }

    const {weight, dimentions, colours, material} = selectedItemId.info;

    return (
        <ul className="item__info">
            <li className='info__catgrs-key'>Weight: <span className='info__catgrs-value'>{weight}</span></li>
            <li className='info__catgrs-key'>Dimentions: <span className='info__catgrs-value'>{dimentions} </span></li>
            <li className='info__catgrs-key'>Colours: <span className='info__catgrs-value'>{colours}</span></li>
            <li className='info__catgrs-key'>Material: <span className='info__catgrs-value'>{material}</span></li>
        </ul>
    )
}

export default AdditionalInfo;