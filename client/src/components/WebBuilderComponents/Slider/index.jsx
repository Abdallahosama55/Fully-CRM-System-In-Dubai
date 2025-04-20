import { Modal, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// style
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./styles.css";
import { Delete2SVG, EditSVG } from 'assets/jsx-svg';
import SliderForm from '../Forms/SliderForm';
import { useForm } from 'antd/es/form/Form';
const MySlider = (props) => {
    const [localData, setLoaclData] = useState(props.images);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [form] = useForm();

    useEffect(() => {
        document.documentElement.style.setProperty('--dotes-color', props.dotesColor || "#000");
    }, [props.dotesColor])

    const settings = {
        dots: props.dotesPositioning === "no-dotes" ? false : true,
        infinite: props.isInfinite || true,
        speed: props.speed || 500,
        slidesToShow: props.slidesToShow || 1,
        slidesToScroll: props.slidesToScroll || 1,
        dotesPosition: props.dotesPositioning || "end",
        fade: props.fade || false,
        autoplay: props.autoplay || true,
        autoplaySpeed: props.autoplaySpeed || 5000,
        pauseOnHover: props.pauseOnHover || true,
        rtl: props.isRtl || false,
        arrows: false,
        appendDots: dots => (
            <div
                data-slick-dotes-color={"red"}
                style={{
                    position: "absolute",
                    bottom: 0,
                    transform: props.dotesPositioning === "end" ?
                        "translateX(-8px) translateY(-8px)" : props.dotesPositioning === "start" ?
                            "translateX(8px) translateY(-8px)" : "translateY(-8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: props.dotesPositioning
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
    };

    const handelChanges = () => {
        form.validateFields()
            .then((values) => {
                props.onEdit(props.id, values)
                setIsEditOpen(false);
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            <Modal
                open={isEditOpen}
                onCancel={() => {
                    setIsEditOpen(false);
                    setLoaclData(props.images);
                }}
                onOk={handelChanges}
                okText="Save changes"
                okButtonProps={{ style: { backgroundColor: "#272942" } }}
            >
                <SliderForm form={form} data={props} />
            </Modal>
            <div className='web_builder_slider'>
                <Slider {...settings}>
                    {localData?.map((el, index) => <div className='image_slide_container' key={index}>
                        <img
                            className='image_slide'
                            style={{ height: `${props.height}px` || "250px" }}
                            src={el}
                            alt={`slide ${index + 1}`}
                        />
                    </div>)}
                </Slider>
                {props.isEditMode && <div className='edit_btns_container'>
                    <button className='center-items' onClick={() => {
                        props.onDelete(props.id)
                    }}>
                        <Tooltip title={"Delete slider"}>
                            <Delete2SVG color="#000" />
                        </Tooltip>
                    </button>
                    <button className='center-items' onClick={() => {
                        setIsEditOpen(true);
                    }}>
                        <Tooltip title={"Edit slider"}>
                            <EditSVG color="#000" />
                        </Tooltip>
                    </button>
                </div>}
            </div>
        </>
    )
}

export default MySlider