import { Form, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'
// flags
import usaPNG from "assets/images/usa.png";
import uaePNG from "assets/images/united-arab-emirates.png";
import russiaPNG from "assets/images/russia.png";
import turkeyPNG from "assets/images/turkey.png";
import francePNG from "assets/images/france.png";
import Editor from 'components/common/Editor';

import isQuillEmpty from '../../../../../../../utils/isQuillEmpty';
// style
import "./styles.css";
const MultiLungEditor = () => {
    const [isDescriptionError, setIsDescriptionError] = useState(false);
    return (
        <div className='multi_lung_editor'>
            <Tabs>
                <TabPane
                    forceRender={true}
                    tab={
                        <div className='flag_tab_title'>
                            <img src={usaPNG} alt="usa" />
                            <span className='fz-12'>English</span>
                        </div>
                    } key="ENGLISH">
                    <Form.Item hidden name={["description", 0, "name"]} initialValue={"english"} />
                    <Form.Item name={["description", 0, "value"]} rules={[
                        {
                            validator: (_, value) => {
                                if (!value || isQuillEmpty(value)) {
                                    setIsDescriptionError(true);
                                    return Promise.reject("Enter english description");
                                } else {
                                    setIsDescriptionError(false);
                                    return Promise.resolve();
                                }
                            },
                        }]}
                    >
                        <Editor style={{
                            borderColor: isDescriptionError ? "red" : "#EFEFF1",
                        }} placeholder={"Enter description here"} />
                    </Form.Item>
                </TabPane>
                <TabPane
                    forceRender={true}
                    tab={
                        <div className='flag_tab_title'>
                            <img src={uaePNG} alt="arabic" />
                            <span className='fz-12'>Arabic</span>
                        </div>
                    } key="Arabic">
                    <Form.Item hidden name={["description", 1, "name"]} initialValue={"arabic"} />
                    <Form.Item name={["description", 1, "value"]}>
                        <Editor placeholder={"Enter description here"} />
                    </Form.Item>
                </TabPane>
                <TabPane
                    forceRender={true}
                    tab={
                        <div className='flag_tab_title'>
                            <img src={russiaPNG} alt="russia" />
                            <span className='fz-12'>Russia</span>
                        </div>
                    } key="Russia">
                    <Form.Item hidden name={["description", 2, "name"]} initialValue={"russia"} />
                    <Form.Item name={["description", 2, "value"]} initialValue={""}>
                        <Editor placeholder={"Enter description here"} />
                    </Form.Item>
                </TabPane>
                <TabPane
                    forceRender={true}
                    tab={
                        <div className='flag_tab_title'>
                            <img src={turkeyPNG} alt="turkey" />
                            <span className='fz-12'>Turkey</span>
                        </div>
                    } key="Turkey">
                    <Form.Item hidden name={["description", 3, "name"]} initialValue={"turkey"} />
                    <Form.Item name={["description", 3, "value"]} initialValue={""}>
                        <Editor placeholder={"Enter description here"} />
                    </Form.Item>
                </TabPane>
                <TabPane
                    forceRender={true}
                    tab={
                        <div className='flag_tab_title'>
                            <img src={francePNG} alt="france" />
                            <span className='fz-12'>France</span>
                        </div>
                    } key="France">
                    <Form.Item hidden name={["description", 4, "name"]} initialValue={"france"} />
                    <Form.Item name={["description", 4, "value"]} initialValue={""}>
                        <Editor placeholder={"Enter description here"} />
                    </Form.Item>
                </TabPane>
            </Tabs>
        </div >
    )
}

export default MultiLungEditor