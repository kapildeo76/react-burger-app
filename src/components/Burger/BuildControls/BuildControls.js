import classes from "./buildcontrols.module.css"
import React from "react"
import BuildControl from "./BuildControl/BuildControl"
import Aux from "../../../hoc/Auxiliary"

const CONTROLS = [
    {label:"Salad",type:'salad'},
    {label:"Cheese",type:'cheese'},
    {label:"Meat",type:'meat'},
    {label:"Bacon",type:'bacon'},
    
]

const BuildControls = (props) => (
    <Aux>
    <div className={classes.BuildControls}>
        <label>Price  ${props.totalPrice}</label>
    </div>
    <div className={classes.BuildControls}>
        {CONTROLS.map(ctrl => (
            <BuildControl label={ctrl.label} 
                key={ctrl.label}
                add={() => props.addIngredients(ctrl.type)}
                remove={() => props.removeIngredients(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            >
            </BuildControl>
        ))}
        {console.log(props.isReadToPurchase)};
        <button onClick={props.purchaseHandler} 
            disabled={!props.isReadToPurchase}
            className={classes.OrderButton}>
        Order Now
        </button>
    </div>
    </Aux>
)

export default BuildControls;