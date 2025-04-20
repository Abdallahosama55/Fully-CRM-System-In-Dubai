import { Checkbox, Empty, Form, Input, Result, Spin } from 'antd'
import { SearchSVG } from 'assets/jsx-svg'
import { OFFICER_TYPE } from 'constants/BUYER_GROUB'
import OFFICER_TYPES from 'constants/OFFICER_TYPES'
import ROUTER_URLS from 'constants/ROUTER_URLS'
import { useUserContext } from 'context/userContext'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetSelectedSupplier from 'services/pricingModule/Queries/useGetSelectedSupplier'
import useListSuppliers from 'services/pricingModule/Queries/useListSuppliers'

const SelectSuppliers = ({ inventoryType, buyerGroupId, form, isLoading }) => {
  const inventorySuppliers = useListSuppliers(inventoryType);
  const selectedSupplierQuery = useGetSelectedSupplier({ inventoryType, buyerGroupId });
  const {user} = useUserContext();
  useEffect(() => {
    if (selectedSupplierQuery.data) {
      form.setFieldValue("officesId", selectedSupplierQuery?.data?.map(el => el?.id))
    }
  }, [selectedSupplierQuery.data])

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (inventoryType) {
      form.setFieldValue("inventoryType", inventoryType)
    }

    if (buyerGroupId) {
      form.setFieldValue("buyerGroupId", buyerGroupId)
    }
  }, [form, inventoryType, buyerGroupId])

  if (isLoading || inventorySuppliers.isLoading) {
    return <div className='center-items' style={{ height: "300px" }}>
      <Spin />
    </div>
  }

  if (inventorySuppliers.data && inventorySuppliers.data.length === 0) {
    return <Empty description={<div>
      <p>There are no suppliers available under this category</p>
      <p>To begin adding suppliers{user.officerType === OFFICER_TYPES.DMC && <>, please <span
        onClick={() => navigate(ROUTER_URLS.CRM.SUPPLIERS)}
        style={{
          color: "#6172F3",
          cursor: "pointer"
        }}>click here</span></>}
      </p>
    </div>
    } />
  }

  if (inventorySuppliers.isError) {
    return <Result
      status="error"
      title="There are some problems with your operation."
    />
  }


  console.log(inventorySuppliers?.data)
  return (
    <div className='mb-1'>
      <Input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        type={"search"}
        icon={<SearchSVG />}
        placeholder='Search supplier'
      />
      <Form
        form={form}
      >
        <Form.Item hidden initialValue={inventoryType} name={"inventoryType"} />
        <Form.Item hidden initialValue={buyerGroupId} name={"buyerGroupId"} />
        <Form.Item name="officesId" rules={[{ required: true, message: "Select at least one supplier" }]}>
          <Checkbox.Group>
            {inventorySuppliers?.data?.
            filter((el) => el?.fullName?.toLowerCase().includes(searchText.toLowerCase()) || el?.name?.toLowerCase().includes(searchText.toLowerCase()))
              ?.map((el) => (
                <Checkbox
                  value={el.id}
                  key={el.id}
                  className="w-100"
                  style={{ marginTop: "12px" }}
                >
                  {el?.fullName || el?.name}
                </Checkbox>
              ))}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SelectSuppliers