import { DatePicker, Form } from "antd";
// import { CalendarSVG } from 'assets/jsx-svg';

export default function StockTab() {
  return (
    <section className="general-form">
      <Form.Item name="stockDateAvailable" label="Date Available">
        <DatePicker
          placeholder="Pick date from the calendar"
          // suffixIcon={<CalendarSVG />}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </section>
  );
}
