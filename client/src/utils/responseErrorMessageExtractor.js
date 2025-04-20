const responseErrorMessageExtractor = (error, errorPlaceholder = "Something went wrong") => {
  try {
    const { data } = error?.response;
    if (data?.errors && Array.isArray(data?.errors)) {
      return data.errors.join(", ");
    }
    if (data?.message) {
      return data.message;
    }
    if (data?.error) {
      return data.error;
    }
    return errorPlaceholder;
  } catch (error) {
    console.log(error);
    return errorPlaceholder;
  }
};

export default responseErrorMessageExtractor;
