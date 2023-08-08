import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function handleFileUpload(images: string[], token: string) {
  console.log(images);
  const formData = new FormData();
  for (var i = 0; i < images.length; i++) {
    let image = images[i];
    console.log(image);
    let name = uuidv4() + ".jpeg";
    const fieldName = `file[${i}]name`;
    const imageName = `file[${i}]image`;

    formData.append(fieldName, name);
    formData.append(imageName, image);
  }
  debugger;
  for (const value of formData.values()) {
    console.log(value);
  }
  let response = await axios.post( "https://backend.facegen.ai/api/images/",
  formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );
    console.log(response);
  return response;
}
