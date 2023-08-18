import {axiosfile} from "@/utils/axios";
import { v4 as uuidv4 } from "uuid";

export async function handleFileUpload(images: FileList) {
  const formData = new FormData();
  for (var i = 0; i < images.length; i++) {
    let image = images[i];
    let name = uuidv4() + ".jpeg";
    const fieldName = `file[${i}]name`;
    const imageName = `file[${i}]image`;

    formData.append(fieldName, name);
    formData.append(imageName, image);
  }
  // debugger;
  let response = await axiosfile.post( "https://backend.facegen.ai/api/images/",
  formData,
    
  );
    console.log(response);
  return response;
}
