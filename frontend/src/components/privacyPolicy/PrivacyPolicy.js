import './privacyPolicy.scss';

const PrivacyPolicy = () => {
    return (
        <div className='policy'>
            <div className='policy__wrapper'>
                <h2 className='policy__tittle'>Privacy Policy</h2>
                <div className='policy__content-wrapper'>
                    <p>
                        1.1. By providing his personal data, the User gives consent and permission for the use,
                        processing and transfer of his personal data exclusively within the Law of Ukraine "On Personal
                        Data Protection" of 01.06.2010. № 2297-VI to confirm the authority and fulfill the terms of the
                        contract.
                    </p>
                    <p>1.2. The purpose of collecting personal data is to support further communication with users.</p>
                    <p>
                        1.3. By providing his personal data, the User gives his consent to receive information
                        (mailings) from the Owner by e-mail or SMS.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
