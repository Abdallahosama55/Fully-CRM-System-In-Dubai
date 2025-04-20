import * as React from "react";
import { memo } from "react";
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={19} fill="none" {...props}>
    <path
      fill="#E62E6B"
      fillRule="evenodd"
      d="M2.41 3.604h.935a1.993 1.993 0 0 1 1.989 1.989v6.534H1.477V4.541a.935.935 0 0 1 .934-.937Z"
      clipRule="evenodd"
    />
    <path
      fill="#F66"
      fillRule="evenodd"
      d="M2.41 3.604h.436a1.993 1.993 0 0 1 1.989 1.989v6.534H1.477V4.541a.935.935 0 0 1 .934-.937Z"
      clipRule="evenodd"
    />
    <path
      fill="#F0B16E"
      fillRule="evenodd"
      d="M3 .473a1.328 1.328 0 1 1 0 2.656A1.328 1.328 0 0 1 3 .473Zm9.892 0a1.328 1.328 0 1 1 0 2.656 1.328 1.328 0 0 1 0-2.656Zm-4.922 0a1.328 1.328 0 1 1 .004 2.656A1.328 1.328 0 0 1 7.97.473Z"
      clipRule="evenodd"
    />
    <path
      fill="#FCD4A9"
      fillRule="evenodd"
      d="M2.578 3.06A1.329 1.329 0 1 1 1.72.544a1.329 1.329 0 0 1 .858 2.516ZM12.47.542a1.33 1.33 0 1 1 .858 2.516A1.33 1.33 0 0 1 12.47.542Zm-4.922 0a1.329 1.329 0 1 1 .858 2.516A1.329 1.329 0 0 1 7.548.542Z"
      clipRule="evenodd"
    />
    <path
      fill="#F0B16E"
      fillRule="evenodd"
      d="M2.224 5.863a.749.749 0 0 1 .747.747v5.518H1.477V6.61a.749.749 0 0 1 .747-.747Z"
      clipRule="evenodd"
    />
    <path
      fill="#FCD4A9"
      fillRule="evenodd"
      d="M2.479 12.127h-.995V6.61a.528.528 0 1 1 .995 0v5.518Z"
      clipRule="evenodd"
    />
    <path
      fill="#FFC34D"
      fillRule="evenodd"
      d="M7.364 3.604h.934a1.993 1.993 0 0 1 1.989 1.989v6.534H6.43V4.541a.935.935 0 0 1 .934-.937Z"
      clipRule="evenodd"
    />
    <path
      fill="#FFE14D"
      fillRule="evenodd"
      d="M7.363 3.604h.435a1.993 1.993 0 0 1 1.989 1.989v6.534H6.43V4.541a.935.935 0 0 1 .933-.937Z"
      clipRule="evenodd"
    />
    <path
      fill="#F0B16E"
      fillRule="evenodd"
      d="M7.177 5.863a.749.749 0 0 1 .747.747v5.518H6.43V6.61a.749.749 0 0 1 .747-.747Z"
      clipRule="evenodd"
    />
    <path
      fill="#FCD4A9"
      fillRule="evenodd"
      d="M7.424 12.127h-.995V6.61a.528.528 0 1 1 .995 0v5.518Z"
      clipRule="evenodd"
    />
    <path
      fill="#96F"
      fillRule="evenodd"
      d="M12.378 3.604h.934a1.993 1.993 0 0 1 1.99 1.989v6.534h-3.857V4.541a.937.937 0 0 1 .933-.937Z"
      clipRule="evenodd"
    />
    <path
      fill="#A9F"
      fillRule="evenodd"
      d="M12.378 3.604h.435a1.993 1.993 0 0 1 1.99 1.989v6.534h-3.358V4.541a.937.937 0 0 1 .933-.937Z"
      clipRule="evenodd"
    />
    <path
      fill="#F0B16E"
      fillRule="evenodd"
      d="M16.048 10.121a.749.749 0 0 1-.747.747h-3.856V6.61a.747.747 0 1 1 1.494 0v2.764h2.362a.749.749 0 0 1 .747.747Z"
      clipRule="evenodd"
    />
    <path
      fill="#FCD4A9"
      fillRule="evenodd"
      d="M14.802 10.866h-3.357V6.61a.528.528 0 1 1 .995 0v2.764h2.363a.747.747 0 0 1 0 1.494h-.001Z"
      clipRule="evenodd"
    />
    <path
      fill="#0218D6"
      fillRule="evenodd"
      d="m20 12.781-3.672 5.751v-3.645H4.488c-5.226 0-5.4-5.689-3.008-8.446v2.9c-.007.851.3 1.374.939 1.524h13.909V7.22L20 12.781Z"
      clipRule="evenodd"
    />
    <path
      fill="#3F65E4"
      fillRule="evenodd"
      d="M.644 7.723A5.8 5.8 0 0 1 1.48 6.44v2.9c-.007.851.3 1.374.94 1.524h13.906V7.219l3.672 5.56-3.327 4.03v-2.8H4.831C.756 14.014-.247 10.555.644 7.723Z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
