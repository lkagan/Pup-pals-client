const errorMessage = (err) => {
    const messages = [];
  
    for (let error in err.response.data) {
      messages.push(err.response?.data[error].message);
    }
  
    alert(messages.join("\n"));
  }

    export default errorMessage;