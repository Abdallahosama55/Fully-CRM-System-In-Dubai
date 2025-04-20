import { Button, message, Popover, Select, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import PluseSVG from "assets/jsx-svg/PluseSVG";
import QuotationsSVG from "assets/jsx-svg/QuotationsSVG";
import ArrowDownSVG from "assets/jsx-svg/ArrowDownSVG";

import { useDebounce } from "hooks/useDebounce";
import React, { useState } from "react";
import useAddToQuotation from "services/travel/quotation/Mutations/useAddToQuotation";
import useListQuotations from "services/travel/quotation/Queries/useListQuotations";
import NewQuotationModal from "./NewQuotationModal";

const AddToQuotation = ({ addButtonProps, item }) => {
  const [visible, setVisible] = useState(false);
  const [isAddNewQuotationOpen, setIsAddNewQuotationOpen] = useState(false);
  const [form] = useForm();
  const [quotationNameSearch, setQuotationNameSearch] = useState("");
  const [qutationId, setQutationId] = useState(null);
  const debouncedQuotationNameSearch = useDebounce(quotationNameSearch, 500);
  const quotationsList = useListQuotations({ name: debouncedQuotationNameSearch });
  const addToQuotation = useAddToQuotation({
    onSuccess: () => {
      message.success("Item added to quotation");
      setIsAddNewQuotationOpen(false);
      form.resetFields();
      quotationsList.refetch();
      setVisible(false);
    },
    onError: (error) => {
      message?.error(error?.message || "something went wrong");
    },
  });
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handelFinish = (values) => {
    addToQuotation.mutate({
      ...values,
      item,
    });
  };

  return (
    <>
      <NewQuotationModal
        isOpen={isAddNewQuotationOpen}
        close={() => {
          setIsAddNewQuotationOpen(false);
        }}
        handelFinish={handelFinish}
        loading={addToQuotation?.isPending}
      />
      <Tooltip title="Add to quotation">
        <Popover
          content={
            <div onClick={(e) => e?.preventDefault()}>
              {quotationsList?.data?.pages?.map((page) => page?.rows).flat()?.length === 0 ? (
                <Button
                  size="small"
                  icon={<PluseSVG color={"currentColor"} />}
                  type="primary"
                  block
                  onClick={() => {
                    setIsAddNewQuotationOpen(true);
                  }}>
                  New Quotation
                </Button>
              ) : (
                <>
                  <Select
                    onSelect={setQutationId}
                    value={qutationId}
                    suffixIcon={<ArrowDownSVG />}
                    showSearch
                    onSearch={setQuotationNameSearch}
                    placeholder="Select quotation"
                    options={
                      Array.isArray(quotationsList?.data?.pages)
                        ? quotationsList?.data?.pages
                            ?.map((page) => page?.rows)
                            .flat()
                            ?.map((el) => ({
                              label: el?.name,
                              value: el?.id,
                            }))
                        : []
                    }
                    filterOption={false}
                    notFoundContent={null}
                    onPopupScroll={(e) => {
                      const { scrollTop, scrollHeight, clientHeight } = e.target;
                      if (
                        scrollHeight - scrollTop <= clientHeight &&
                        !quotationsList.isLoading &&
                        !quotationsList.isFetching
                      ) {
                        quotationsList?.fetchNextPage();
                      }
                    }}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Button
                          size="small"
                          icon={<PluseSVG color={"currentColor"} />}
                          type="primary"
                          block
                          onClick={() => {
                            setIsAddNewQuotationOpen(true);
                          }}>
                          New
                        </Button>
                      </>
                    )}
                    style={{ width: "100%" }}
                  />

                  <Button
                    style={{ marginTop: "0.5rem" }}
                    block
                    type={"primary"}
                    size={"small"}
                    icon={<PluseSVG color={"currentColor"} />}
                    loading={addToQuotation?.isPending}
                    onClick={() => {
                      addToQuotation.mutate({
                        qutationId,
                        item,
                      });
                    }}
                    disabled={!qutationId}>
                    Add
                  </Button>
                </>
              )}
            </div>
          }
          title="Add to quotation"
          trigger={["click"]}
          open={visible}
          onOpenChange={handleVisibleChange}>
          <Button icon={<QuotationsSVG />} {...addButtonProps} />
        </Popover>
      </Tooltip>
    </>
  );
};

export default AddToQuotation;
