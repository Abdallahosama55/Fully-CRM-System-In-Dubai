import { Checkbox, Form } from 'antd'
import React from 'react'
// style
import "./styles.css"
const TermsAndCondation = ({ cancellationPolicy, smokingAllowed }) => {
    return (
        <div className='terms_and_condation'>
            <Form.Item name="term_1_check" rules={[{ required: true, message: "Read and accept this conditions" }]} valuePropName='checked'>
                <Checkbox>
                    <div>
                        <p className='fz-14 fw-700'>I accept the following terms and conditions: </p>
                        <p className='fz-14 fw-400 mb-1' >By checking this box, I acknowledge and agree to the hotel’s reservation policy, cancellation policy, check-in/check-out times, payment requirements, damage responsibility, {!smokingAllowed && "smokingAllowed, "}and pet policy as outlined above.</p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>1. Reservation Policy:</span>
                            <span className='gc'> Reservations must be guaranteed with a valid credit card. Non-guaranteed reservations will be released at the hotel's discretion.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>2. Cancellation Policy:</span>
                            <span className='gc'> {cancellationPolicy} to avoid a full reserviation room charge.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>3. Payment:</span>
                            <span className='gc'> Full payment for the stay is required upon check-in. Accepted payment methods include credit card, debit card, and cash.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>4. Damages:</span>
                            <span className='gc'> Guests are responsible for any damages caused to the hotel property during their stay.</span>
                        </p>
                        {!smokingAllowed && <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>5. Non-Smoking Policy:</span>
                            <span className='gc'> Smoking is strictly prohibited in all rooms and indoor areas of the hotel. A cleaning fee will be charged for any violations.</span>
                        </p>}
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>{!smokingAllowed ? "6" : "5"}. Pet Policy:</span>
                            <span className='gc'> Pets are not allowed unless specified. Service animals are permitted as required by law.</span>
                        </p>
                    </div>
                </Checkbox>
            </Form.Item>
            <Form.Item name="term_2_check" rules={[{ required: true, message: "Read and accept this policies" }]} valuePropName='checked'>
                <Checkbox>
                    <div>
                        <p className='fz-14 fw-700' style={{ color: "#2D5FEB" }}>I accept the following policies:</p>
                        <p className='fz-14 fw-400 mb-1' >Your personal information is protected and will only be used for booking and customer service purposes. We do not share your information with third parties without your consent.</p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>1. Privacy Policy:</span>
                            <span className='gc'> Reservations must be guaranteed with a valid credit card. Non-guaranteed reservations will be released at the hotel's discretion.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>2. Cookie Policy:</span>
                            <span className='gc'>  Our website uses cookies to enhance your browsing experience. By continuing to use our site, you agree to our cookie policy.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>3. Refund Policy:</span>
                            <span className='gc'> Refunds are processed within 7-10 business days for eligible cancellations made within the specified time frame.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>4. Guest Conduct Policy:</span>
                            <span className='gc'> Guests are expected to conduct themselves in a respectful manner. Any behavior deemed inappropriate by hotel staff may result in removal from the premises without a refund.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>5. Safety and Security Policy:</span>
                            <span className='gc'> For the safety and security of all guests, the hotel is equipped with surveillance cameras in public areas. Unauthorized access to restricted areas is prohibited.</span>
                        </p>
                    </div>
                </Checkbox>
            </Form.Item>
        </div >
    )
}

export default TermsAndCondation