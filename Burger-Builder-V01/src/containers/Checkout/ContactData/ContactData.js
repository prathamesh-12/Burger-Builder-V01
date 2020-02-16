import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest', displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest', displayValue: 'Cheapest'
                        }
                    ]
                },
                value: '',
                valid: false
            }
        },
       
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        //this.setState( { loading: true } );
        
        let formData = null;

        for (let iInputField in this.state.orderForm) {
            this.state.orderForm[iInputField] = this.state.orderForm[iInputField].value;
            formData = this.state.orderForm;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false } );
        //         this.props.history.push('/');
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false } );
        //     } );
    }

    onInputChangedHandler = (event, inputIndentifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElements = {...updatedForm[inputIndentifier]};
        updatedFormElements.value = event.target.value;
        updatedFormElements.valid = this.checkValidation(event.target.value, updatedFormElements.validation);
        updatedFormElements.touched = true;
        updatedForm[inputIndentifier] = updatedFormElements;
        console.log(updatedForm);
        this.setState({orderForm: updatedForm});
    }

    checkValidation = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    render () {

        let formElementsArray = [];

        for (let iKey in this.state.orderForm) {
            formElementsArray.push({
                key: iKey,
                config: this.state.orderForm[iKey]
            })
        }

        let form = (
            <form onSubmit={(event) => this.orderHandler(event)}>
                {/* <Input inputtype="text" type="text" name="name" placeholder="Your Name" />
                {/* <Input inputtype="text" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="text" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="text" type="text" name="street" placeholder="Street" />
            <Input inputtype="text" type="text" name="postal" placeholder="Postal Code" /> */}
                
                {formElementsArray.map(formEle => {
                    return <Input 
                        key={formEle.key}
                        elementtype={formEle.config.elementType}
                        elementconfig={formEle.config.elementConfig}
                        value={formEle.config.value}
                        invalid={!formEle.config.valid}
                        touched={formEle.config.touched}
                        shouldValidate={formEle.config.validation || false}
                        inputChanged={(event) => this.onInputChangedHandler(event, formEle.key)}/>
                })}
                <Button btnType="Success" type="submit">ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;