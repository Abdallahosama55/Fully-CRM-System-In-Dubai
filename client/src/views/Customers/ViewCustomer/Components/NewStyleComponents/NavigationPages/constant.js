export const ACCOUNT_STATUS_TEXT = {
  PENDING: "pending",
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const ACCOUNT_STATUS_VALUE = {
  [ACCOUNT_STATUS_TEXT.PENDING]: 1,
  [ACCOUNT_STATUS_TEXT.ACTIVE]: 2,
  [ACCOUNT_STATUS_TEXT.INACTIVE]: 3,
};

export const ACCOUNT_STATUS_COLOR = {
  [ACCOUNT_STATUS_TEXT.ACTIVE]: "green",
  [ACCOUNT_STATUS_TEXT.INACTIVE]: "red",
  [ACCOUNT_STATUS_TEXT.PENDING]: "orange",
};
///accountStatusId 1->pending 2->active 3->inactive
