import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_QjVYyLFIUFO2B9Tsa5bPFxuQ00JdBhYEM6';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response =>  {
            if (response.status === 200){
                console.log('Succes message: ',response.statusText)
                alert('Payment successful');
            }
        }).catch(error => {
            console.log('Payment error: ',JSON.parse(error));
            
            alert('There was an issue with your payment. Check your card data');
        });
    }

    return (
        <StripeCheckout 
            label='Pay now'
            name='Crown clothing ltd.' 
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}

        />
    );
};

export default StripeCheckoutButton;