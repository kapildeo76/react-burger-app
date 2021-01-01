import React from "react"
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button"
import './ordersummary.module.css'
const orderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
        .map((key) => {
            return(
                <tr>
                    <td>{props.ingredients[key]}</td>
                    <td><span style={{textTransform:'capitalize'}}>{key}</span>
                    </td>
                    <td>
                    {props.ingredientsPrice[key]}
                    </td> 
                    <td>
                    {props.ingredients[key]*props.ingredientsPrice[key]}
                    </td>
                </tr>
              )
        });
    return(
        <Aux>
             <h3>Your Order</h3>
             <p>Ingredients added are </p>
             
                <table>
                    <thead>
                        <tr>
                        <th>Quantity</th>
                        <th>Ingredients</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                <tbody>
                     {orderSummary}
                </tbody>
                </table>   
             <p><strong>Total Price :</strong> ${props.totalPrice}</p>
             <p>Continue to Order?</p>
             <Button btnType='Danger' clicked={props.cancelled}>CANCEL</Button>
             <Button btnType='Success' clicked={props.purchased}>CONTINUE</Button>
        </Aux>       
    )
}

export default orderSummary;