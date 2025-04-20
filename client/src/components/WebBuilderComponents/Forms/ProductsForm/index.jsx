import { Col, Form, Input, Radio, Row, Select, Typography, message } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import CategoryService from 'services/category.service';
import ShopService from 'services/shop.service';
// no image
import default_image from '../../../../assets/images/default_image.png'
// style
import "./styles.css"
const ProductsForm = ({ form, data }) => {
    const data_source = useWatch("data_source", form);
    const [categories, setCategories] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsOptions, setProductsOptions] = useState([]);

    const getData = () => {
        const getTranslation = (productTranslations, company) => {
            const temp = productTranslations?.find((el) => el?.languageCode === "en" || el?.languageCode === company?.languageCode)
            return temp
        }

        CategoryService.search()
            .then(({ data }) => {
                const optionsTemp = data.data.categories.map(category => {
                    return {
                        value: category?.id,
                        label: category?.categoryTranslations?.find(el => el.languageCode === "en")?.name
                    }
                })
                setCategories(optionsTemp);
                setCategoriesOptions(optionsTemp);
            }).catch(() => {
                message.error("Something went wrong");
            });

        ShopService.getMyProductList({})
            .then((res) => {
                const temp = []
                console.log(res?.data?.data?.rows)
                res?.data?.data?.rows?.forEach(product => {
                    const translation = getTranslation(product.productTranslations, product.company);

                    product?.productVariants?.forEach(variant => {
                        temp.push({
                            name: variant?.name || translation?.name,
                            image: variant?.images ? variant?.images[0] : null,
                            id: variant?.id
                        })
                    })
                })

                setProducts(temp);
                setProductsOptions(temp);
            })
    }

    useEffect(() => {
        getData();
    }, [])


    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form])

    return <Form form={form} layout='vertical'>
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter section name" }]}
                    label={"Section name (will not appear to the end user)"}>
                    <Input placeholder='section name' />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: "Please enter section title" }]}
                    label={"Section title"}>
                    <Input placeholder='section name' />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="more_link"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value) {
                                    // Here, you can add custom validation logic.
                                    // For example, you can check if the value is a valid URL.
                                    const isValidUrl = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value);

                                    if (!isValidUrl) {
                                        return Promise.reject("Please enter a valid link");
                                    }
                                }


                                return Promise.resolve();
                            }
                        }
                    ]}
                    label={"Link to more products"}>
                    <Input placeholder='section name' />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    label={"Data source"}
                    name="data_source"
                    rules={[{ required: true, message: "you have to select the data source" }]}>
                    <Radio.Group>
                        <Radio value="by_categories">Select categories</Radio>
                        <Radio value="by_products">Select products</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            {data_source === "by_categories" && <Col span={24}>
                <Form.Item
                    name="data_categories"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value || !value.length || value.length < 1) {
                                    return Promise.reject("You have to select at least one category")
                                }

                                return Promise.resolve();
                            }
                        }
                    ]}
                    label={"Categories"}>
                    <Select
                        style={{ zIndex: 99999, position: "relative" }}
                        mode="multiple"
                        placeholder="Categories to show"
                        onSearch={(value) => {
                            const newOptions = categories.filter((category) =>
                                category.label.toLowerCase().includes(value.toLowerCase()))
                            setCategoriesOptions(newOptions)
                        }}
                        options={categoriesOptions}
                        showSearch
                    />
                </Form.Item>
            </Col>}

            {data_source === "by_products" && <Col span={24}>
                <Form.Item
                    name="data_products"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value || !value.length || value.length < 1) {
                                    return Promise.reject("You have to select at least one products")
                                }

                                return Promise.resolve();
                            }
                        }
                    ]}
                    label={"Products"}>
                    <Select
                        style={{
                            zIndex: 99999,
                            position: "relative"
                        }}
                        mode="multiple"
                        placeholder="Products to show"
                        onSearch={(value) => {
                            const newOptions = products.filter((product) =>
                                product.name.toLowerCase().includes(value.toLowerCase()))
                            setProductsOptions(newOptions)
                        }}
                        options={productsOptions?.map(el => {
                            return {
                                value: el.id,
                                label: <div className='product_option'>
                                    <img src={el?.image || default_image} alt={el?.name} />
                                    <Typography.Text ellipsis className='product_name'>{el?.name}</Typography.Text>
                                </div>
                            }
                        })}
                        showSearch
                    />
                </Form.Item>
            </Col>}
        </Row>
    </Form >
}

export default ProductsForm