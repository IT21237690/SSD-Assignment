import axios from "axios";

export const debounceFunc = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const sendEmail = async (isChildArrival, messageData) => {
  const { idArray, userData } = messageData;

  const template = {
    lowStock: "template_vhd76w8",
    childArrival: "template_7yhhpn3",
  };
  // below code is to send email
  var data = {
    service_id: "service_7v3cmyp",
    template_id: isChildArrival ? template.childArrival : template.lowStock,
    user_id: "HKwArnYUr2PS2eAc7",
    template_params: { ...userData },
  };
  const debouncedSendEmail = debounceFunc(async () => {
    const res = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //below code is to update the email sent date in the database
    if (res && !isChildArrival && idArray && idArray.length)
      await setEmailSent({
        stockId: idArray,
      });
  }, 1000);
  debouncedSendEmail();

};

export const setEmailSent = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8070/api/inventory/emailSent",
      {
        ids: data.stockId,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLastEmailSentDate = async (idArray) => {
  try {
    if (!idArray || !idArray.length) return;
    const res = await axios.post(
      "http://localhost:8070/api/inventory/emailSentDates",
      { ids: idArray }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
