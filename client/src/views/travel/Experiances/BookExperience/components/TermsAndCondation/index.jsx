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
                        <p className='fz-14 fw-400 mb-1' >By checking this box, I acknowledge and agree to the hotel’s reservation policy, cancellation policy, check-in/check-out times, payment requirements, damage responsibility, and pet policy as outlined above.</p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>1. Introduction:</span>
                            <span className='gc'> By using Vindo, you agree to these terms and conditions.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>2. Eligibility:</span>
                            <span className='gc'>  Users must be 18+ and meet specific requirements for activities.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>3. Booking and Payment:</span>
                            <span className='gc'> Bookings are subject to availability and must be paid in full at the time of booking. Prices may vary.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>4. Cancellations and Refunds:</span>
                            <span className='gc'> Cancellations [within 48 hours of the activity] are eligible for a refund. Provider cancellations offer refunds or rescheduling. No refunds for no-shows.</span>
                        </p>
                        {!smokingAllowed && <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>5. User Responsibilities:</span>
                            <span className='gc'> Provide accurate information, follow safety guidelines, and adhere to provider instructions. The app isn’t liable for any injuries or losses during activities.</span>
                        </p>}
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>6. Activity Providers:</span>
                            <span className='gc'> The app acts as an intermediary and isn’t responsible for the quality or safety of activities. Disputes must be resolved with the provider.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>7. Liability:</span>
                            <span className='gc'> The app isn’t liable for any damages arising from app use or participation in activities.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>8. Privacy:</span>
                            <span className='gc'> Your information is collected and used per our <a href="" className='gc fw-500' style={{textDecoration:"underline"}}>Privacy Policy</a>. By using the app, you agree to this.</span>
                        </p>
                        <p className='fz-14 fw-400'>
                            <span className='fz-14 fw-600'>8. Changes:</span>
                            <span className='gc'> We may update these terms at any time. Continued use of the app means you accept the changes.</span>
                        </p>
                    </div>
                </Checkbox>
            </Form.Item>
        </div >
    )
}

export default TermsAndCondation