import React from 'react';

const CheckoutWizard = ({ activeStep = 0, className }) => {
    const titles = [
        "User Login",
        "Address",
        "Payment Method",
        "Place Order"
    ]

    return (
        <div className={`flex flex-wrap ${className || ""}`}>
            {titles.map((title, index) => (
                <div key={index}
                className={`border-b-2 flex-auto text-center 
                ${index <= activeStep ?
                "border-b-blue-600 text-blue-600" :
                "border-b-gray-700 text-gray-700"}`}
                >
                    {title}
                </div>
            ))}
        </div>
    );
}

export default CheckoutWizard;
