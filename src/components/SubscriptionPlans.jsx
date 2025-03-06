import React, { useState } from 'react';

const SubscriptionPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState('None');

    const plans = [
        { name: 'Monthly Plan', price: '$10/month' },
        { name: 'Quarterly Plan', price: '$27/3 months' },
        { name: 'Annual Plan', price: '$100/year' },
    ];

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Select Your Subscription Plan</h1>
            <div className="flex space-x-4 mb-4">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-200 transition"
                        onClick={() => handlePlanSelect(plan.name)}
                    >
                        <h2 className="text-xl font-semibold">{plan.name}</h2>
                        <p className="text-lg">{plan.price}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <h3 className="text-lg">You have selected: <span className="font-bold">{selectedPlan}</span></h3>
            </div>
        </div>
    );
};

export default SubscriptionPlans;