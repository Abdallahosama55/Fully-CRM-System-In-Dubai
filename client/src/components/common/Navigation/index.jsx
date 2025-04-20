import { Col, Dropdown, Row, Typography } from 'antd'
import { DownSvg } from 'assets/jsx-svg'
import React from 'react'
import { Link } from 'react-router-dom'
// style
import './styles.css';
const Navigation = ({ navItems, activeTab }) => {
    return <nav className="main-navigation">
        <div className="main-navigation-wraper">
            {navItems?.map((item) =>
                item.items.length > 0 ? (
                    <Dropdown
                        key={item.id}
                        overlayStyle={{ minWidth: "200px" }}
                        menu={{ items: item.items }}
                        trigger={["click"]}
                    >
                        <div
                            className={`main-navigation-item ${activeTab === item.id && "main-navigation-active-item"
                                }`}
                        >
                            <Row align="middle" gutter={[8, 0]} wrap={false}>
                                <Col>
                                    <Typography.Text className="wc fw-500" ellipsis>
                                        {item.label}
                                    </Typography.Text>
                                </Col>
                                <Col>
                                    <DownSvg color="#fff" />
                                </Col>
                            </Row>
                        </div>
                    </Dropdown>
                ) : (
                    <Link
                        key={item.id}
                        to={item.active}
                        className={`main-navigation-item ${activeTab === item.id && "main-navigation-active-item"
                            }`}
                    >
                        <Typography.Text className="wc fw-500" ellipsis>
                            {item.label}
                        </Typography.Text>
                    </Link>
                ),
            )}
        </div>
    </nav>
}

export default Navigation