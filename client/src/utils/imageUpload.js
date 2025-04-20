import { message, Upload } from 'antd';

function beforUploadImage(file) {
  if (file.size > 3145728) {
    message.error('File must be less than 3MB');
    return Upload.LIST_IGNORE;
  } else {
    return false;
  }
}

export default beforUploadImage;
