import { Button } from 'antd';
import PrintSVG from 'assets/jsx-svg/PrintSVG';
import LoadingPage from 'components/common/LoadingPage';
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import useGetBranding from 'services/travel/branding/Queries/useGetBranding'
import isValidJson from 'utils/isValidJson';
import InvoiceTemplate from 'views/travel/Branding/components/InvoiceTemplate'

const InvoicesTab = ({ data , bookingInfo }) => {
    const brandingData = useGetBranding();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    if (brandingData.isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <div className='space-between mb-1'>
                <p className='md_text_bold' style={{ color: "var(--gray-700);" }}>Incoming Invoices</p>
                <Button onClick={handlePrint} icon={<PrintSVG color="#fff" />} type={"primary"} size='small'>PRINT INVOICE</Button>
            </div>
            <div ref={componentRef} style={{
                borderRadius: "8px",
                border: "1px solid #EAECF2",
                padding: "var(--Space-300, 12px)",
            }}>
                <InvoiceTemplate {...{
                    withData:true,
                    logo: isValidJson(brandingData?.data?.logo) ? JSON.parse(brandingData?.data?.logo) : null,
                    waterMark: isValidJson(brandingData?.data?.waterMark) ? JSON.parse(brandingData?.data?.waterMark) : null,
                    primaryColor: brandingData?.data?.primaryColor,
                    secondaryColor: brandingData?.data?.secondaryColor,
                    ...data,
                    ...bookingInfo
                }} />
            </div>
        </div>
    )
}

export default InvoicesTab