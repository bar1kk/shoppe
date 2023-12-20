import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsAuthenticated } from 'react-auth-kit';
import { useHeader } from '../../../../hooks/header';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { fetchProfile } from '../../../userAccount/UserAccountSlice';

import ReviewItem from './ReviewItem';
import ReviewAddForm from './ReviewAddForm';

const Reviews = () => {
    const { header } = useHeader();
    const dispatch = useDispatch();
    const { selectedItemId } = useSelector((state) => state.item);
    const { profile } = useSelector((state) => state.userAccount);
    const { reviews, name } = selectedItemId;
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        console.log(isAuthenticated());
        if (isAuthenticated()) {
            dispatch(fetchProfile(header));
        }
        // eslint-disable-next-line
    }, []);

    const renderReviewForm = () => {
        return isAuthenticated() ? (
            profile.first_name && profile.last_name ? (
                <ReviewAddForm />
            ) : (
                <span className='reviews__title'>Add your first and last name to your profile to add reviews.</span>
            )
        ) : (
            <span className='reviews__title'>Sign in or register to add a review.</span>
        );
    };

    if (selectedItemId && Array.isArray(selectedItemId.reviews) && selectedItemId.reviews.length > 0) {
        return (
            <motion.main
                className='main__container'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
                <div className='reviews'>
                    <div className='reviews__wrapper'>
                        <div className='reviews__items'>
                            <div className='reviews__title'>
                                {reviews.length} Reviews for {name}
                            </div>
                            {reviews.map(({ id, user: { first_name, last_name }, rating, description, created_at }) => {
                                const formattedDate = format(new Date(created_at), 'yyyy-MM-dd HH:mm');
                                return (
                                    <ReviewItem
                                        key={id}
                                        firstName={first_name}
                                        lastName={last_name}
                                        rating={rating}
                                        description={description}
                                        date={formattedDate}
                                    />
                                );
                            })}
                        </div>
                        {renderReviewForm()}
                    </div>
                </div>
            </motion.main>
        );
    } else {
        return (
            <motion.main
                className='main__container'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
                <div className='reviews'>
                    <div className='reviews__wrapper'>
                        <div className='reviews__items'>
                            <div className='reviews__title'>No Reviews for {name}</div>
                        </div>
                        {renderReviewForm()}
                    </div>
                </div>
            </motion.main>
        );
    }
};

export default Reviews;
