const Wrapper = (text = "Yayy!!") => {
  const element = document.createElement("div");

  element.innerHTML = text;

  return element;
};

export default Wrapper;
