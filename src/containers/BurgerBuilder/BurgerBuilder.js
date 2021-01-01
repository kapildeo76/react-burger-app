import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
    salad:0.50,
    meat:1.50,
    cheese:0.75,
    bacon:1.25
}
class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        totalPrice:2.0,
        isReadyToPurchase:false,
        OriginalPrice:0,
        purchaseNow:false
    }
    componentDidMount(){
        this.setState({
            OriginalPrice:this.state.totalPrice
        }
        )
    }
    isReadyToOrder = (price) => {
        if(price>this.state.OriginalPrice){
            this.setState({
                isReadyToPurchase:true
            })
        }else{
            this.setState({
                isReadyToPurchase:false
            })
        }
    }

    purchaseHandler () {
        this.setState({
            purchaseNow:true
        })
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchaseNow:false
        })
    }

    processPurchase = () => {
        alert("Your Order is confirmed");
    }

    addIngredients = (type) =>{
        let ingredients = this.state.ingredients;
        const count = ingredients[type]; 
        const updatedCount = count + 1;
        const updateIngredients = {
            ...ingredients
        }
        updateIngredients[type] = updatedCount;
        const newPrice = INGREDIENTS_PRICES[type] + this.state.totalPrice;
        this.isReadyToOrder(newPrice);
        this.setState({
            totalPrice:newPrice,
            ingredients:updateIngredients
        })
        //this.isReadyToOrder(newPrice);
    }

    removeIngredients = (type) =>{
        let ingredients = this.state.ingredients;
        const count = ingredients[type]; 
        if(count <= 0){
            return;
        }
        const updatedCount = count - 1;
        const updateIngredients = {
            ...ingredients
        }
        updateIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
        this.isReadyToOrder(newPrice);
        this.setState({
            totalPrice:newPrice,
            ingredients:updateIngredients
        })
        //this.isReadyToOrder(newPrice);
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchaseNow} hide={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        totalPrice={this.state.totalPrice}
                        cancelled={this.cancelPurchaseHandler}
                        purchased={this.processPurchase}
                        ingredients={this.state.ingredients}
                        ingredientsPrice={INGREDIENTS_PRICES}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    isReadToPurchase={this.state.isReadyToPurchase} 
                    totalPrice={this.state.totalPrice}
                    addIngredients={this.addIngredients}
                    removeIngredients={this.removeIngredients}   
                    disabled={disabledInfo}
                    purchaseHandler={this.purchaseHandler.bind(this)}
                >    
                </BuildControls> 
            </Aux>
        );
    }
}

export default BurgerBuilder;