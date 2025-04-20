import { PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Col, Divider, Input, Row, Select, message } from "antd";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useLookupMutation from "services/newSettings/Mutations/useLookupMutation";
import useGetLookup from "services/newSettings/Query/useGetLookup";

/**
 * SelectLookups component for displaying a Select with options based on the provided type.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.placeholder
 * @param {"cites"|"countries"|"job"|"departements"|"nationality"|"states"} props.type - The type used to fetch data for the Select.
 * @returns {JSX.Element} - The rendered SelectLookups component.
 */
const filterOption = (input, option) => {
  return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
};
const SelectLookups = ({
  id,
  type,
  placeholder,
  addConfig,
  config = {},
  disabled = false,
  ...rest
}) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const { data, isPending, isFetching, key } = useGetLookup(
    { type, params: id },
    { enabled: !disabled },
  );

  const { addLookup, isPending: isItemCreationPending } = useLookupMutation(
    { type },
    {
      onError: () => {
        message.error("Failed to add item");
      },
      onSuccess: () => {
        message.success(addConfig.successMessage ?? "Item added");
      },
    },
  );

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setName("");
    await addLookup(addConfig?.prepareData?.(name) ?? { name });
    await queryClient.invalidateQueries({ queryKey: key });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      filterOption={filterOption}
      {...rest}
      disabled={disabled}
      placeholder={placeholder}
      loading={isFetching && isPending}
      dropdownRender={
        addConfig
          ? (menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Row
                  gutter={[12]}
                  style={{
                    padding: "0 8px 4px",
                    width: "100%",
                  }}>
                  <Col flex={1}>
                    <Input
                      allowClear
                      placeholder={addConfig?.placeholder ?? "type item name"}
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </Col>
                  <Col>
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={handleAddItem}
                      disabled={!name}
                      loading={isItemCreationPending}>
                      {addConfig?.addLabel ?? "Add Item"}
                    </Button>
                  </Col>
                </Row>
              </>
            )
          : undefined
      }>
      {(data || []).map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item?.name ?? item?.title}
        </Select.Option>
      ))}
    </Select>
  );
};

/**
 * PropTypes for SelectLookups component.
 * @type {Object}
 * @property {string} type - The type used to fetch data for the Select.
 */
SelectLookups.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default SelectLookups;
