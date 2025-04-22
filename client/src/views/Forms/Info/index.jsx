import React, { useRef, useState } from "react";
import { Button, Input, Switch, Select, Typography, Space, Tabs, Divider, Tooltip, message } from "antd";
import { DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ShareIcon from "assets/EyeFormSVG";
import "./info.css";
import '../ShareModal/styles.css';
import ChooceChecked from "assets/jsx-svg/ChooceChecked";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import ResultFormInfo from "./components/ResultFormInfo";
import MultipleChooseType from "./components/QuestionsTypes/MultipleChooseType";
import ShortAnswerType from "./components/QuestionsTypes/ShortAnswerType";
import ParagraphType from "./components/QuestionsTypes/ParagraphType";
import CheckBoxesType from "./components/QuestionsTypes/CheckBoxesType";
import TimeType from "./components/QuestionsTypes/TimeType";
import DateTypes from "./components/QuestionsTypes/DateTypes";
import FileuploadTypes from "./components/QuestionsTypes/FileuploadTypes";
import { ArrowDownSVG } from "assets/jsx-svg";
import useAddForm from "services/CrmForms/Mutations/useAddForm";
import ShareModal from "../ShareModal/ShareModal";

const { TextArea } = Input;
const { Title, Text } = Typography;

function Index() {
  const [name, setname] = useState("");
  const [activeChecked, setActiveChecked] = useState(true);
  const questionContainerRef = useRef(null);
  const [description, setDescription] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [questionType, setQuestionType] = useState("Multiple choice");
  const [activeTab, setActiveTab] = useState("1");
  const [questionsList, setQuestionsList] = useState([
    {
      type: "Multiple choice",
      id: 1,
      required: true,
      questionText: "How many times do you travel yearly?",
      options: ["5 times", "10 times", "Over 15 times"]
    },
  ]);

  const answerTypeMap = {
    "Short answer": "short_answer",
    "Paragraph": "paragraph",
    "Multiple choice": "multiple_choice",
    "Checkboxes": "checkboxes",
    "File upload": "file_upload",
    "Date": "date",
    "Time": "time"
  };

  const questionTypeOptions = [
    {
      value: "Short answer",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          Short answer
        </span>
      ),
    },
    {
      value: "Paragraph",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          Paragraph
        </span>
      ),
    },
    {
      value: "Multiple choice",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          Multiple choice
        </span>
      ),
    },
    {
      value: "Checkboxes",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          Checkboxes
        </span>
      ),
    },
    {
      value: "File upload",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          File upload
        </span>
      ),
    },
    {
      value: "Date",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          Date
        </span>
      ),
    },
    {
      value: "Time",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ChooceChecked />
          Time
        </span>
      ),
    },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleFileChange = (id, file) => {
    setQuestionsList(prev => 
      prev.map(q => q.id === id ? {...q, fileValue: file} : q)
    );
  };
   
  const handleAddQuestion = () => {
    const defaultQuestions = {
      "Multiple choice": {
        questionText: "Select your preferred option",
        options: ["Option 1", "Option 2"]
      },
      "Checkboxes": {
        questionText: "Select all that apply",
        options: ["Option A", "Option B"]
      },
      "Short answer": {
        questionText: "Please provide a short answer"
      },
      "Paragraph": {
        questionText: "Please provide a detailed response"
      },
  "File upload": {
  questionText: "Upload your file here",
  fileValue: null
},
      "Date": {
        questionText: "Select a date",
        dateValue: { month: "", day: "", year: "" }
      },
      "Time": {
        questionText: "Select a time",
        timeValue: { hour: "", minute: "", ampm: "AM" }
      }
    };

    const newQuestion = {
      type: questionType,
      id: Date.now(),
      required: isRequired,
      questionText: defaultQuestions[questionType].questionText,
      ...(defaultQuestions[questionType].options && { 
        options: [...defaultQuestions[questionType].options] 
      }),
      ...(defaultQuestions[questionType].timeValue && { 
        timeValue: defaultQuestions[questionType].timeValue 
      }),
      ...(defaultQuestions[questionType].dateValue && { 
        dateValue: defaultQuestions[questionType].dateValue 
      })
    };

    setQuestionsList((prev) => [...prev, newQuestion]);
  
    setTimeout(() => {
      if (questionContainerRef.current) {
        questionContainerRef.current.scrollTo({
          top: questionContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleRemoveQuestion = (id) => {
    setQuestionsList(questionsList.filter((question) => question.id !== id));
  };

  const handleMoveQuestion = (id, direction) => {
    setQuestionsList((prev) => {
      const index = prev.findIndex((q) => q.id === id);
      if (index === -1) return prev;

      const newQuestions = [...prev];
      if (direction === "up" && index > 0) {
        [newQuestions[index - 1], newQuestions[index]] = [
          newQuestions[index],
          newQuestions[index - 1],
        ];
      } else if (direction === "down" && index < newQuestions.length - 1) {
        [newQuestions[index + 1], newQuestions[index]] = [
          newQuestions[index],
          newQuestions[index + 1],
        ];
      }
      return newQuestions;
    });
  };

  const handleQuestionTextChange = (id, text) => {
    setQuestionsList(prev => 
      prev.map(q => q.id === id ? {...q, questionText: text} : q)
    );
  };

  const handleOptionsChange = (id, newOptions) => {
    setQuestionsList(prev => 
      prev.map(q => q.id === id ? {...q, options: newOptions} : q)
    );
  };

  const handleTimeChange = (id, timeValue) => {
    setQuestionsList(prev => 
      prev.map(q => q.id === id ? {...q, timeValue} : q)
    );
  };

  const handleDateChange = (id, dateValue) => {
    setQuestionsList(prev => 
      prev.map(q => q.id === id ? {...q, dateValue} : q)
    );
  };

  const getFormData = () => {
    return {
      name,
      description,
      status: activeChecked ? "active" : "inactive",
      questions: questionsList.map(q => ({
        questionText: q.questionText,
        answerType: answerTypeMap[q.type],
        ...(q.options && { options: q.options }),
        ...(q.timeValue && { timeValue: q.timeValue }),
        ...(q.dateValue && { dateValue: q.dateValue }),
        ...(q.fileValue && { fileValue: q.fileValue }),

        required: q.required
      }))
    };
  };

  const renderQuestionComponent = (question, index) => {
    const { type, id } = question;

    const questionComponents = {
      "Multiple choice": (
        <MultipleChooseType 
          questionText={question.questionText}
          options={question.options}
          onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
          onOptionsChange={(options) => handleOptionsChange(id, options)}
        />
      ),
      "Short answer": (
        <ShortAnswerType 
          questionText={question.questionText}
          onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
        />
      ),
      "Paragraph": (
        <ParagraphType 
          questionText={question.questionText}
          onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
        />
      ),
      "Checkboxes": (
        <CheckBoxesType 
          questionText={question.questionText}
          options={question.options}
          onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
          onOptionsChange={(options) => handleOptionsChange(id, options)}
        />
      ),
      "Time": (
        <TimeType 
          questionText={question.questionText}
          timeValue={question.timeValue || { hour: "", minute: "", ampm: "AM" }}
          onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
          onTimeChange={(time) => handleTimeChange(id, time)}
        />
      ),
      "Date": (
        <DateTypes 
          questionText={question.questionText}
          dateValue={question.dateValue || { month: "", day: "", year: "" }}
          onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
          onDateChange={(date) => handleDateChange(id, date)}
        />
      ),
      "File upload": (
        <FileuploadTypes 
        questionText={question.questionText}
        fileValue={question.fileValue || null}
        onQuestionTextChange={(text) => handleQuestionTextChange(id, text)}
        onFileChange={(file) => handleFileChange(id, file)}
      />
      ),
    };

    return (
      <div key={id} style={{ width: "100%", position: "relative", marginBottom: 16 }}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1,
            display: "flex",
            gap: 8,
          }}>
          <Button.Group>
            <Tooltip title="Move Up">
              <Button
                type="text"
                icon={<ArrowUpOutlined />}
                onClick={() => handleMoveQuestion(id, "up")}
                disabled={index === 0}
              />
            </Tooltip>
            <Tooltip title="Move Down">
              <Button
                type="text"
                icon={<ArrowDownOutlined />}
                onClick={() => handleMoveQuestion(id, "down")}
                disabled={index === questionsList.length - 1}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveQuestion(id)}
              />
            </Tooltip>
          </Button.Group>
        </div>
        {questionComponents[type] || null}
      </div>
    );
  };

  const renderFormInfo = () => (
    <div className="container-info">
      <header>
      <ShareModal isOpen={openModal} deskId={slug} setIsOpen={setOpenModal} />
        <Title level={4}>Form Info</Title>
        <Space>
          <Button disabled={slug?false:true} onClick={handleShare} icon={<ShareIcon />}>Share</Button>
          <Button>
            Active <Switch 
            defaultChecked 
            checked={activeChecked}
            onClick={() => setActiveChecked(!activeChecked)}
            style={{ backgroundColor: activeChecked?"#12B76A":"#d9d9d9" }}
            // class="active-switch--1"
            // style={{ backgroundColor: "#12B76A" }} 
            />
          </Button>
        </Space>
      </header>

      <div className="form-section" style={{ paddingBlock: "12px" }}>
        <div className="form-group">
          <label className="form-label">Form Name</label>
          <Input
            placeholder="Travel agent registration"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <TextArea
            rows={3}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="question-section">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            paddingInline: "24px",
            paddingBlock: "12px",
          }}>
          <Title level={4} style={{ flexGrow: 1, marginBlock: 5 }}>
            Question Details
          </Title>
          <span>Required</span>
          <Switch
            checked={isRequired}
            onChange={setIsRequired}
            className="custom-switch"

          />
          <Select
            value={questionType}
            onChange={setQuestionType}
            style={{ width: 200 }}
            options={questionTypeOptions}
            suffixIcon={<ArrowDownSVG color="#3F65E4" />}
            dropdownStyle={{ minWidth: 200 }}
            optionLabelProp="label"
          />
          <Button type="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </div>
        <Divider style={{ color: "#D0D5DD" }} />

        <Space
          ref={questionContainerRef}
          direction="vertical"
          size={8}
          style={{
            width: "100%",
            height: "400px",
            overflowY: "auto",
            display: "flex",
            padding: "24px",
          }}>
          {questionsList.map((question, index) => renderQuestionComponent(question, index))}
        </Space>
      </div>
    </div>
  );

  const renderResults = () => {
    const formData = getFormData();
    return (
      <div className="results-container">
        <ResultFormInfo formData={formData} />
      </div>
    );
  };
  
  const [slug, setSlug] = useState('');

  const [openModal, setOpenModal] = useState(false);
const handleShare=()=>{
if (slug) {
  setOpenModal(true);
}
}
const { addForm, isPending } = useAddForm();
const handleSaveForm = async () => {
  try {
    const formData = getFormData();
    const newForm = await addForm(formData);
    setSlug(newForm.data.slug); 
  } catch (err) {
    console.error("Failed to save form:", err);
  }
};

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: "1",
              label: "Info / Questions",
              children: renderFormInfo(),
            },
            {
              key: "2",
              label: "Results",
              children: renderResults(),
            },
          ]}
          className="custom-tabs"
        />
        {activeTab === "1" && (
          <BottomNavigation isLoading={isPending} onSave={handleSaveForm} />
        )}
      </div>
    </DndProvider>
  );
}

export default Index;