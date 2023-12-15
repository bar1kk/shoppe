import { useSelector } from 'react-redux';
import { useIsAuthenticated } from 'react-auth-kit';

import ReviewItem from './ReviewItem';
import ReviewAddForm from './ReviewAddForm';

const Reviews = () => {
    const { selectedItemId } = useSelector((state) => state.item);
    const { profile } = useSelector((state) => state.userAccount);
    const { reviews, name } = selectedItemId;
    const isAuthenticated = useIsAuthenticated();

    if (selectedItemId && Array.isArray(selectedItemId.reviews)) {
        return (
            <div className='reviews'>
                <div className='reviews__wrapper'>
                    <div className='reviews__items'>
                        <div className='reviews__title'>
                            {reviews.length} Reviews for {name}
                        </div>
                        {reviews.map(({ name, rating, descr, date }, i) => (
                            <ReviewItem key={i} name={name} rating={rating} descr={descr} date={date} />
                        ))}
                    </div>
                    {isAuthenticated() ? (
                        profile.first_name  && profile.last_name ? (
                            <ReviewAddForm />
                        ) : (
                            <span className='reviews__title'>
                                Add your first and last name to your profile to add reviews.
                            </span>
                        )
                    ) : (
                        <span className='reviews__title'>Sign in or register to add a review.</span>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className='reviews'>
                <div className='reviews__wrapper'>
                    <div className='reviews__items'>
                        <div className='reviews__title'>No Reviews for {name}</div>
                    </div>
                    {isAuthenticated() ? (
                        <ReviewAddForm />
                    ) : (
                        <span className='reviews__title'>Sign in or register to add a review.</span>
                    )}
                </div>
            </div>
        );
    }
};

export default Reviews;
