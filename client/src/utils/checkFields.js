import { message } from 'antd';

export default function checkFileds(form) {
  // console.log(form.getFieldsError());
  let firstFieldError = form.getFieldsError().find((field) => {
    return field.errors.length > 0;
  });

  if (firstFieldError) {
    firstFieldError = form.getFieldInstance(firstFieldError.name[0]);

    if (typeof firstFieldError.scrollIntoView === 'function') {
      firstFieldError.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    if (firstFieldError.input) {
      firstFieldError.input.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    if (firstFieldError.resizableTextArea) {
      firstFieldError.resizableTextArea.textArea.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    form.getFieldsError().map((field) => {
      if (field.errors[0]) {
        return message.error('' + field.errors[0]);
      }
      return field;
    });
  }
}
