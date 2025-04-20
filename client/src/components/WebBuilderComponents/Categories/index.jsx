import { Col, Modal, Row, Skeleton, Tooltip, Typography, message } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react'
import CategoryService from 'services/category.service';
import CategoriesForm from '../Forms/CategoriesForm';
import { Delete2SVG, EditSVG } from 'assets/jsx-svg';
import Slider from "react-slick";
import { useForm } from 'antd/es/form/Form';
// style
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

// no image
import default_image from '../../../assets/images/default_image.png'
const SLIDER_SETTINGS = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 920,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
}
const Categories = ({ categories: categoriesIDs, id, name, onEdit, onDelete, isEditMode = false, }) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [form] = useForm();

    useEffect(() => {
        setIsLoading(true);
        CategoryService.getCategoriesByIDs(categoriesIDs)
            .then(({ data }) => {
                setCategories(data.data);
            }).catch((error) => {
                message.error(error.message);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [])


    const handelChanges = () => {
        form.validateFields()
            .then((values) => {
                onEdit(id, values)
                setIsEditOpen(false);
            }).catch((error) => {
                console.log(error)
            })
    }

    if (!categoriesIDs || categoriesIDs?.length === 0) {
        return null
    }

    if (isLoading) {
        return <Row gutter={[12, 12]} align={"middle"} justify={"center"} style={{overflow:"hidden" , flexWrap:"nowrap"}}>
            {categoriesIDs.map(el => <Col key={el} lg={6} md={12} xs={24} className='center-items loading_card'>
                <Skeleton.Image active style={{ borderRadius: "50%" }} />
                <Skeleton.Input active style={{ marginTop: "8px" }} />
            </Col>
            )}
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
                <CategoriesForm form={form} data={{ categories: categoriesIDs, name, id }} />
            </Modal>
            <div className='web_builder_categories'>
                <Slider {...SLIDER_SETTINGS} dots={false}>
                    {categories?.map(el => {
                        return <div div key={el.id} >
                            <div className='category_slide'>
                                <img
                                    src={el.image || default_image}
                                    alt={el?.categoryTranslations?.find(el => el.languageCode === "en")?.name}
                                    className='category_image'
                                />
                                <Typography.Paragraph className='category_name' ellipsis>{el?.categoryTranslations?.find(el => el.languageCode === "en")?.name}</Typography.Paragraph>
                            </div>
                        </div>
                    })}
                </Slider >

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
            </div >
        </>
    )
}

export default Categories