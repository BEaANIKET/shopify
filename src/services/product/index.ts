

import axios from "axios";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { addProductSchema } from "@/schema/addProductSchema";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export const addNewProduct = async (values, file) => {

  let cloudinaryData = null;
  try {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Image upload failed");
      }

      cloudinaryData = await cloudinaryResponse.json();
      const cld = new Cloudinary({
        cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME },
      });
      const img = cld
        .image(cloudinaryData.public_id)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(500).height(500));

      const response = await axios.post("/api/admin/addproduct", {
        name: values.name,
        size: values.size,
        price: values.price,
        description: values.description,
        category: values.category,
        deliveryInfo: values.deliveryInfo,
        onSale: values.onSale,
        priceDrop: Number(values.priceDrop),
        imageUrl: img.toURL(),
      });
      return response.data;

    }

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "An error occurred while adding the product"
    );

    // If the backend request fails, delete the uploaded file from Cloudinary
    if (cloudinaryData) {
      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: cloudinaryData.public_id }),
        }
      );
    }
  }

  return null;
}

export const updateNewProduct = async (values, id) => {
  try {

    const response = await axios.put(`/api/admin/updateproduct?id=${id}`, values);
    return response.data;

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "An error occurred while updateing the product"
    );
    return null;
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/admin/deleteproduct?id=${id}`)
    return response.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "An error occurred while deleting the product"
    );
    return null;
  }
}

export const getProduct = async (query) => {
  try {
    const response = await axios.get(`/api/client/product?query=${query}`)
    return response.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "An error occurred while getting the product"
    );
    return null;
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`/api/client/getproductbyid?productId=${id}`)
    return response.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "An error occurred while getting the product"
    );
    return null;
  }
}

