import { useRef, useState, useEffect, useContext } from "react";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Row,
  Input,
  Tooltip,
  Typography,
  Image,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ARflag from "assets/images/ARflag.png";
import IconlyLightOutlinePlus from "assets/images/IconlyLightOutlinePlus.png";
import "../styles.css";
import Delete from "assets/images/IconlyLightOutlineDelete.png";

import { ArrowDownSVG, MenuDotsSVG, USFlagSVG } from "assets/jsx-svg";
import Option from "./Option";
import Variation from "./Variation";
import { removeUndefined } from "utils/removeUndefined";
import { getSpecial } from "utils/productVariations";
import CommonService from "services/common.service";
import { axiosCatch } from "utils/axiosUtils";
import ProductsService from "services/product.service";
import ModelService from "services/model.service";
import AddCancelButtons from "components/common/AddCancelButtons";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import { useDrawer } from "hooks/useDrawer";

const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function combos(list, n = 0, result = [], current = []) {
  if (n === list.length) result.push(current);
  else list[n].forEach((item) => combos(list, n + 1, result, [...current, item]));

  return result;
}

function getVariantKeywords(variant, language) {
  let productText = [];
  variant[0].split("/").forEach((txt) => {
    productText.push(txt.trim());
  });
  language.forEach((lang) => {
    variant[1][`name${lang.code}`].split("/").forEach((txt) => {
      productText.push(txt.trim());
    });
  });

  return productText;
}

export default function OptionsTab({
  data,
  setData,
  onClose,
  setProductsCount,
  priceCurrency,
  setDisabled,
  language,
  setProductsdata,
}) {
  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);
  const addBtnRef = useRef();
  const addOptionRef = useRef([]);
  const [form] = useForm();
  const DrawerAPI = useDrawer();

  const [ownModels, setOwnModels] = useState([]);
  const [addBtnDisabled, setAddBtnDisabled] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [attOptions, setAttOptions] = useState([]);
  const [variations, setVariations] = useState([]);
  const [arVariations, setArVariations] = useState({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ModelService.getOwnModel()
      .then(({ data }) => setOwnModels(data.data))
      .catch(axiosCatch);
  }, []);

  useEffect(() => {
    if (attOptions.length > 0) {
      let rawOptions = [];
      attOptions.map((att) => rawOptions.push(att.options));

      language.forEach((lang) => {
        let allArr = [];

        for (let i = 0; i < rawOptions.length; i++) {
          let nestedArr = [];
          for (let j = 0; j < rawOptions[i].length; j++) {
            nestedArr.push(rawOptions[i][j][`${lang.code}OptionName`]);
          }
          nestedArr = nestedArr.filter((value) => value !== "");
          allArr.push(nestedArr);
          allArr = allArr.filter((arr) => arr.length !== 0);
          if (lang.code === user?.languageCode) {
            setVariations(combos(allArr));
          } else {
            if (allArr.length < 1) return;
            // eslint-disable-next-line no-loop-func
            setArVariations((prev) => ({ ...prev, [lang?.code]: combos(allArr) }));
          }
        }
      });

      // allArrAr = allArrAr.filter((arr) => arr.length !== 0);
      // setArVariations(combos(allArrAr));
    }

    form.setFieldValue("attributes", attOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attOptions]);

  useEffect(() => {
    if (attributes.length === 0) {
      setVariations([]);
    }
  }, [attributes]);

  function onDragEnd(result, move) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(attributes, result.source.index, result.destination.index);

    const op = reorder(attOptions, result.source.index, result.destination.index);

    move(result.source.index, result.destination.index);

    setAttributes([...quotes]);
    setAttOptions([...op]);
  }

  function onOptionsDragEnd(result, move, attKey) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    let currentAttIndex = attOptions.findIndex((op) => op.attId === attKey);

    const quotes = reorder(
      [...attOptions[currentAttIndex].options],
      result.source.index,
      result.destination.index,
    );

    move(result.source.index, result.destination.index);

    setAttOptions((prev) => {
      let copy = [...prev];
      copy[currentAttIndex].options = quotes;
      return [...copy];
    });
  }

  const onAddAttribute = () => {
    setAttributes((prev) => {
      if (!form.getFieldValue(`${user?.languageCode}AttributeName`)) {
        return prev;
      }
      let att = {
        id: count,
        defaulttOption: 0,
        colorCheck: false,
        lang: language.map((lang) => {
          return {
            attributeName: form.getFieldValue(`${lang.code}AttributeName`),
            lang: `${lang.code}`,
          };
        }),
      };

      const OptionName = {};
      language.forEach((lang) => {
        OptionName[`${lang.code}OptionName`] = "";
      });

      setAttOptions((prev) => [
        ...prev,
        {
          attId: count,
          options: [{ id: 0, ...OptionName, color: undefined }],
        },
      ]);
      language.forEach((lang) => {
        form.setFieldValue(`${lang.code}AttributeName`, undefined);
      });

      setAddBtnDisabled(true);

      setCount((prev) => prev + 1);

      return [...prev, att];
    });
  };

  const deleteAtt = (key) => {
    setAttributes((prev) => prev.filter((att) => att.id !== key));
    setAttOptions((prev) => prev.filter((op) => op.attId !== key));
  };

  const onColorChecked = (key) => {
    setAttributes((prev) => {
      let selectIndex = prev.findIndex((att) => att.id === key);

      if (selectIndex !== -1) {
        let copy = [...prev];
        copy[selectIndex].colorCheck = !copy[selectIndex].colorCheck;

        return [...copy];
      }
    });
  };

  const onFinish = (values) => {
    setDisabled(true);
    language.forEach((lang) => {
      delete values[`${lang.code}AttributeName`];
    });
    delete values.attributes;

    values = Object.entries(values);
    // values = removeUndefined(values, language, user?.languageCode);

    if (values.length === 0) {
      openNotificationWithIcon("error", undefined, "you must make one variant at lest");
      setLoading(false);
      return;
    }

    let promises = [];
    values.forEach((variant) => {
      if (
        variant[1].specificationLength ||
        variant[1].specificationWidth ||
        variant[1].specificationHeight
      ) {
        if (
          variant[1].specificationLength &&
          variant[1].specificationWidth &&
          variant[1].specificationHeight &&
          data.specificationLengthClass
        ) {
        } else {
          openNotificationWithIcon(
            "info",
            undefined,
            "You Should Enter All Dimensions And (Length Class from Data -> Specification)",
          );

          return;
        }
      }

      if (variant[1].specificationWeight && !data.specificationWeightClass) {
        openNotificationWithIcon(
          "info",
          undefined,
          "You Should Enter Weight Class (from Data -> Specification)",
        );

        return;
      }

      if (!variant[1].productImage) {
        variant[1].productImage = {};
      }

      variant[1].productImage.images = [];
      variant[1].productImage?.fileList?.forEach((image) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", image.originFileObj);
        promises.push(
          CommonService.uploadImage(formData)
            .then(({ data }) => {
              variant[1].productImage.images.push(data.uploadedFiles.image);
            })
            .catch(axiosCatch)
            .finally(() => setLoading(false)),
        );
      });
    });

    let productTranslationCopy = JSON.parse(JSON.stringify(data.productTranslation));

    language.forEach((lang) => {
      productTranslationCopy[lang.code].tags =
        productTranslationCopy[lang.code].tags &&
        JSON.parse(productTranslationCopy[lang.code].tags).join(" ");
    });

    let productText = Object.values(productTranslationCopy)
      .map((lang) => Object.values(lang))
      .flat()
      .filter(Boolean)
      // eslint-disable-next-line array-callback-return
      .map((e) => {
        if (e) {
          return e.trim();
        }
      });

    Promise.allSettled(promises).then(() => {
      const sendData = {
        options: JSON.stringify({
          attributes,
          attOptions,
          variations,
        }),
        modelNumber: data.model,
        location: data.location,
        taxId: data.taxId,
        status: "Active",
        links: data.links,
        dateAvailable: data.stockDateAvailable,
        lengthClass: data.specificationLengthClass,
        weightClass: data.specificationWeightClass,
        shippingClass: data.shippingClass,
        sortOrder: data.specificationSortOrder,
        brandId: data.linksBrand,
        categories: data.linksCategories,
        subCategories: data.linksSubCategories,
        lable: data.linksLabels,
        isDownloadAbel: data.isDownloadAbel ? true : false,
        customTab: JSON.stringify(data.customTab),

        productTranslation: data.productTranslation,

        productVariant: values.map((variant) => ({
          dimensions: `${variant[1].specificationLength}x${variant[1].specificationWidth}x${variant[1].specificationHeight}`,
          weight: variant[1].weight,
          SKU: variant[1].sku,
          libraryId: variant[1].ownModel,
          AREffectId: undefined,
          price: variant[1][`price${user.cuurencyCode}`] || data.Price,
          prices:
            JSON.stringify(
              priceCurrency
                .filter((price) => price !== user.cuurencyCode)
                .map((price) => {
                  return {
                    key: price,
                    value: variant[1][`price${price}`],
                  };
                }),
            ) || data.prices,
          dateAvailable: data.stockDateAvailable,
          quantity: variant[1].quantityLimit,
          minQuantity: variant[1].minimumQuantity,
          downloadLimit: variant[1].downloadLimit,
          downloadExpiry: variant[1].downloadExpiry,
          // type: variant[1].isVirtual ? 'virtual' : 'simple',
          searchKeys:
            [...new Set(productText.concat(getVariantKeywords(variant, language)))]
              .map((word) => word.toLowerCase())
              .join(" ")
              .split(" ")
              .sort()
              .join(" ") || "",
          barCode: "",
          title: variant[0],
          colorCode:
            attOptions
              // eslint-disable-next-line array-callback-return
              .map((op) => {
                const found = op.options.find((ele) =>
                  variant[0].split("/").includes(ele.enOptionName),
                );

                if (found) {
                  return found.color;
                }
              })
              .filter(Boolean)[0] || "",
          name: JSON.stringify(
            language.map((lang) => {
              return {
                [lang.code]: variant[1][`name${lang.code}`],
              };
            })[0],
          ),
          productSpecialPrice: JSON.stringify(getSpecial(variant[1]).specialPrice),
          productSpecialQuantityPrice: JSON.stringify(getSpecial(variant[1]).specialQuantityPrice),
          images: variant[1].productImage.images,
        })),
      };

      ProductsService.addProduct(sendData)
        .then((data) => {
          onClose();
          openNotificationWithIcon("success", "Product Variant Added Successfully ✔");
          DrawerAPI.handleSetDestroyOnClose(true);
          setProductsCount((prev) => prev + 1);
          setProductsdata((prev) => [...prev, data.data.data.product]);
        })
        .catch((error) => {
          setLoading(false);
          openNotificationWithIcon("error", undefined, "Something  wrong");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          setDisabled(true);
          onClose();
        });
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="general-form options-form"
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}>
      {DrawerAPI.Render}
      <div>
        <Form.Item label="Attributes">
          <Row gutter={10}>
            <Col flex={1}>
              <Row gutter={[13, 28]}>
                {language.map((lang) => (
                  <Col key={lang.code} xs={12}>
                    <Row className="option-input" gutter={[10, 10]} align="middle" wrap={false}>
                      <Col className="flag">
                        <Row align="middle" justify="center" className="attribute-lang">
                          <Col
                            style={{
                              marginInlineEnd: "0.3rem",
                            }}>
                            <Row align="middle">
                              <Image src={lang.flag} preview={false} width={21} />
                            </Row>
                          </Col>
                          <Col>
                            <Typography.Text className="fw-700">{lang.iso}</Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{ paddingLeft: 0, paddingRight: 0 }} flex={1}>
                        <Form.Item name={`${lang.code}AttributeName`} noStyle>
                          <Input
                            onChange={(value) => setAddBtnDisabled(!(value.target.value !== ""))}
                            className="attribute-input"
                            placeholder="Enter attribute name"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col className="btn-with-select">
              <Button
                onClick={() => addBtnRef.current.click()}
                type="primary"
                disabled={addBtnDisabled}
                style={{ background: addBtnDisabled ? "#8E8E93" : "#272942", color: "#fff" }}>
                <Row gutter={5}>
                  <Col>
                    <Image preview={false} src={IconlyLightOutlinePlus} />
                  </Col>
                  <Col>Add</Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.List name="attributes">
          {(fields, { remove, move }) => (
            <>
              <Row style={{ display: "none" }}>
                <Button ref={addBtnRef} onClick={onAddAttribute}></Button>
              </Row>
              <DragDropContext onDragEnd={(result) => onDragEnd(result, move)}>
                <Droppable droppableId="list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {fields.map(({ key, name }) => (
                        <Form.Item key={key}>
                          <Draggable draggableId={`${name}${key}`} index={name}>
                            {(provided) => (
                              <Row
                                wrap={false}
                                ref={provided.innerRef}
                                {...provided.draggableProps}>
                                <Col flex={1}>
                                  <Collapse
                                    expandIcon={({ isActive }) =>
                                      isActive ? (
                                        <div>
                                          <Row wrap={false} align="middle" gutter={[12, 0]}>
                                            <Col>
                                              <Row align="middle">
                                                <ArrowDownSVG />
                                              </Row>
                                            </Col>
                                            <Col>
                                              <Button
                                                onClick={() => {
                                                  deleteAtt(key);
                                                  remove(name);
                                                }}
                                                className="remove-opitons">
                                                <Row align="middle" justify="center">
                                                  <Image preview={false} src={Delete} />
                                                </Row>
                                              </Button>
                                            </Col>
                                          </Row>
                                        </div>
                                      ) : (
                                        <div>
                                          <Row wrap={false} align="middle" gutter={[12, 0]}>
                                            <Col>
                                              <Row align="middle">
                                                <ArrowDownSVG />
                                              </Row>
                                            </Col>
                                            <Col>
                                              <Button
                                                onClick={() => {
                                                  deleteAtt(key);
                                                  remove(name);
                                                }}
                                                className="remove-opitons">
                                                <Row align="middle" justify="center">
                                                  <Image preview={false} src={Delete} />
                                                </Row>
                                              </Button>
                                            </Col>
                                          </Row>
                                        </div>
                                      )
                                    }
                                    expandIconPosition="end">
                                    <Collapse.Panel
                                      header={
                                        <Row align="middle" gutter={[8, 0]} wrap={false}>
                                          <Col
                                            {...provided.dragHandleProps}
                                            onClick={(e) => e.stopPropagation()}>
                                            <Row align="middle">
                                              <MenuDotsSVG />
                                            </Row>
                                          </Col>
                                          <Col>
                                            {attributes.find((att) => att.id === key)?.lang[0]
                                              ?.attributeName || "test"}
                                          </Col>
                                        </Row>
                                      }
                                      key="a1">
                                      <Row align="middle" justify="space-between" className="mb-1">
                                        <Col>
                                          <Row align="middle" gutter={[8, 8]}>
                                            <Col>
                                              <Typography.Text className="fz-18 fw-800">
                                                Options
                                              </Typography.Text>
                                            </Col>
                                            <Col>
                                              <Row align="middle" gutter={[5, 0]} wrap={false}>
                                                <Col>
                                                  <Tooltip title="Select if the options have color and select the main option for the attribute">
                                                    {/* <QuestionSVG
                                                    style={{ cursor: "help" }}
                                                  /> */}
                                                  </Tooltip>
                                                </Col>

                                                <Col>
                                                  <Checkbox
                                                    onChange={() => onColorChecked(key)}
                                                    className="small-checkbox">
                                                    <Typography.Text className="fz-12">
                                                      Color:
                                                    </Typography.Text>
                                                  </Checkbox>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </Col>

                                        <Col>
                                          <Button
                                            onClick={() => addOptionRef.current[name].click()}
                                            style={{
                                              background: "#272942",
                                              color: "#fff",
                                            }}>
                                            <Row gutter={5}>
                                              <Col>
                                                <Image
                                                  preview={false}
                                                  src={IconlyLightOutlinePlus}
                                                />
                                              </Col>
                                              <Col>Add option</Col>
                                            </Row>
                                          </Button>
                                        </Col>
                                      </Row>

                                      <Option
                                        language={language}
                                        addOptionRef={addOptionRef}
                                        attKey={key}
                                        name={name}
                                        onOptionsDragEnd={onOptionsDragEnd}
                                        attOptions={attOptions}
                                        setAttOptions={setAttOptions}
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                      />
                                    </Collapse.Panel>
                                  </Collapse>
                                </Col>
                              </Row>
                            )}
                          </Draggable>
                        </Form.Item>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
        </Form.List>

        {attOptions.length > 0 && <Divider style={{ borderTop: "5px solid #000" }} />}

        {/* options combiniation */}
        {variations[0]?.length > 0 && (
          <Collapse accordion>
            {variations.map((variation, index) => (
              <Collapse.Panel forceRender key={index} header={variation.join("/")}>
                <Variation
                  priceCurrency={priceCurrency}
                  form={form}
                  enVariantName={variation.join("/")}
                  VariantName={arVariations}
                  data={data}
                  language={language}
                  // enName={data.productTranslation.en.name}
                  // arName={data.productTranslation.ar.name}
                  lengthClass={data.specificationLengthClass}
                  weightClass={data.specificationWeightClass}
                  ownModels={ownModels}
                  defualtModel={data.ownModel}
                />
              </Collapse.Panel>
            ))}
          </Collapse>
        )}
      </div>
      <div style={{ marginTop: "30px" }}>
        <Form.Item>
          <Row justify="end">
            <AddCancelButtons
              add={() => form.submit()}
              cancel={onClose}
              addName="Finish"
              addLoading={loading}
            />
          </Row>
        </Form.Item>
      </div>
    </Form>
  );
}
