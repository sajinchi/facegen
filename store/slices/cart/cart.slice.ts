import { PurchaseData } from "@/components/product/ProductViewPageSingle";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { IProduct } from "@/types/IProductState";
import { createSlice } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  quantity: number;
  product: IProduct;
}

export interface ICartState {
  // status:StoreStatusEnum;
  data:ICartItem[]
}
const initialState:ICartState = {
  // status: StoreStatusEnum.IDLE,
  data: [],
}

const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        addtocart(state,action){
          let productIndex;
          state.data.forEach((datum,index)=>{
            if(datum.id == action.payload.id){
              productIndex = index;
            }
          });
          if (productIndex !== undefined){
            let item:ICartItem = {
              id: state.data[productIndex].id,
              quantity: state.data[productIndex].quantity + 1,
              product: action.payload
            }
            state.data[productIndex] = item;
          }else{
            let product:ICartItem = {
              id: action.payload.id,
              quantity: 1,
              product: action.payload
            }
            state.data = [...state.data, product];
          }
          
        },
        subtractfromcart(state,action){
          console.log(action.payload);
          let productIndex;
          state.data.forEach((datum,index)=>{
            if(datum.id == action.payload.id){
              productIndex = index;
            }
          });
          console.log(state.data);
          if (productIndex !== undefined) {
            let product = {
              id: state.data[productIndex].id,
              quantity: state.data[productIndex].quantity - 1,
              product: action.payload,
            };
            
            if (product.quantity > 0) {
              state.data[productIndex] = product;
            } else {
              state.data.splice(productIndex, 1);
            }
          }
          /*
          use id i.e. action.payload to get index of product in state.data
          if state.data[productindex].quantity > 1 
            true: state.data[productindex].quantity - 1,
            false: remove state.data[productindex]
          */
        },
        removefromcart(state,action){
          let productIndex;
          state.data.forEach((datum,index)=>{
            if(datum.id == action.payload){
              productIndex = index;
            }
          });
          if (productIndex !== undefined){
            state.data.splice(productIndex, 1);
          }
          /* 
          use id i.e. action.payload to get index of product in state.data
          remove state.data[productindex]
          */
        }
    }
})


export const { addtocart, removefromcart, subtractfromcart} = CartSlice.actions;
export default CartSlice.reducer;