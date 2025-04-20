// extractAntdStyles.js
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleProvider, extractStyle } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

const antdStyleExtractor = (children) => {
  let styleText = '';
  
  try {
    styleText = extractStyle(() => {
      renderToString(
        <StyleProvider hashPriority="high">
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </StyleProvider>
      );
    });
  } catch (error) {
    console.error('Error extracting styles:', error);
  }

  return styleText;
};

export default antdStyleExtractor;
