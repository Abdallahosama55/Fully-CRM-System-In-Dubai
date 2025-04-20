import { Col, Form, Input, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import CategoryService from 'services/category.service';

const CategoriesForm = ({ form, data }) => {
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);

    const getData = () => {
        CategoryService.search()
            .then(({ data }) => {
                const optionsTemp = data.data.categories.map(category => {
                    return {
                        value: category?.id,
                        label: category?.categoryTranslations?.find(el => el.languageCode === "en")?.name
                    }
                })
                setCategories(optionsTemp);
                setOptions(optionsTemp);
            }).catch(() => {
                message.error("Something went wrong");
            });
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
                <Col span={24}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: "Please enter section name" }]}
                        label={"Section name (will not appear to the end user)"}>
                        <Input placeholder='section name' />
                    </Form.Item>
                </Col>
                <Form.Item
                    name="categories"
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
                            setOptions(newOptions)
                        }}
                        options={options}
                        showSearch
                    />
                </Form.Item>
            </Col>
        </Row>
    </Form >
}

export default CategoriesForm