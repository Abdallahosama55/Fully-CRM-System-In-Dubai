import React, { useState } from 'react';
import Slider from "react-slick";
import { Col, Modal, Row, Tooltip, Typography, message } from 'antd';

// style
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import { useEffect } from 'react';
import ProductCard from '../ProductCard';
import ProductsForm from '../Forms/ProductsForm';
import { useForm } from 'antd/es/form/Form';
import { Delete2SVG, EditSVG } from 'assets/jsx-svg';
import ShopService from 'services/shop.service';
import ProductService from 'services/product.service';

const SLIDER_SETTINGS = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 920,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1.2,
                slidesToScroll: 1.2
            }
        }
    ]
}

const ProductsSlider = ({
    data_source,
    data_products,
    data_categories,
    id,
    title,
    onEdit,
    more_link,
    onDelete,
    isEditMode = false,
    ...rest }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [form] = useForm();

    useEffect(() => {
        setIsLoading(true);
        if (data_source === "by_categories") {
            ShopService.getMyProductList({ mainCategory: data_categories })
                .then((res) => {
                    setProducts(res?.data?.data?.rows)
                }).catch(() => {
                    message.error("Somthing went wrong")
                }).finally(() => {
                    setIsLoading(false)
                })
        } else if (data_source === "by_products") {
            ProductService.getVariantData(data_products)
                .then((res) => {
                    setProducts(res?.data?.data)
                }).catch(() => {
                    message.error("Somthing went wrong")
                }).finally(() => {
                    setIsLoading(false)
                })
        }
    }, [data_source, data_categories, data_products])

    const handelChanges = () => {
        form.validateFields()
            .then((values) => {
                onEdit(id, values)
                setIsEditOpen(false);
            }).catch((error) => {
                console.log(error)
            })
    }

    if(isLoading){
        return <Row>
            <Col lg={5} md={3} xs={1}>

            </Col>
        </Row>
    }
    return (
        <>
            <Modal
                open={isEditOpen}
                onCancel={() => {
                    setIsEditOpen(false);
                }}
                onOk={handelChanges}
                okText="Save changes"
                okButtonProps={{ style: { backgroundColor: "#272942" } }}
            >
                <ProductsForm form={form} data={{
                    data_source,
                    data_products,
                    data_categories,
                    id,
                    title,
                    ...rest
                }} />
            </Modal>
            <div className='web_builder_products'>
                <Row className="header" align={"middle"} justify={"space-between"}>
                    <Col>
                        <Typography.Title level={4}>{title}</Typography.Title>
                    </Col>
                    {more_link && <Col>
                        <a href={more_link}>
                            <Typography.Title level={5}>See more</Typography.Title>
                        </a>
                    </Col>}
                </Row>
                <div className="slider">
                    <Slider {...SLIDER_SETTINGS}>
                        {products?.map(el => {
                            return <ProductCard key={el.id} {...el} />
                        })}
                    </Slider>
                </div>
                {isEditMode && <div className='edit_btns_container'>
                    <button className='center-items' onClick={() => {
                        onDelete(id)
                    }}>
                        <Tooltip title={"Delete banner"}>
                            <Delete2SVG color="#000" />
                        </Tooltip>
                    </button>
                    <button className='center-items' onClick={() => {
                        setIsEditOpen(true);
                    }}>
                        <Tooltip title={"Edit banner"}>
                            <EditSVG color="#000" />
                        </Tooltip>
                    </button>
                </div>
                }
            </div>
        </>
    )
}

export default ProductsSlider