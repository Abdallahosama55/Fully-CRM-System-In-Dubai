import React from 'react'
import { Image, Typography } from 'antd';
// style
import "./styles.css";
// no image
import default_image from '../../../assets/images/default_image.png'
const ProductCard = ({ productVariants, productTranslations, ...data }) => {
    const getTranslation = () => {
        return productTranslations?.find((el) => el?.languageCode === "en")
    }

    return (
        <div className='product_card'>
            <div className="image_container">
                <Image.PreviewGroup items={(productVariants[0]?.images && productVariants[0]?.images) || [default_image]}>
                    <Image src={(productVariants[0]?.images && productVariants[0]?.images[0]) || default_image} />
                </Image.PreviewGroup>
            </div>
            <div className="product_card_body">
                <Typography.Text ellipsis className='gc product_name'>{getTranslation()?.name}</Typography.Text>
                <Typography.Text ellipsis className='product_name'>${productVariants[0]?.price}</Typography.Text>
            </div>
        </div>
    )
}

export default ProductCard