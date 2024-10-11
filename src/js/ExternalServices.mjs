
const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const Response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(Response);
    return data.Result;
  }
  async findProductById(id) {
    const Response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(Response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    };
    return await fetch(baseURL + "checkout/", options).then(converToJson);
  }
}

