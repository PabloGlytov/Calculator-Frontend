import React, { useState } from 'react';
import axios from 'axios';
import "./calculator.css"
import { baseUrl } from '../../base.js';

const Calculator = () => {
    const [left, setLeft] = useState('');
    const [operation, setOperation] = useState('+');
    const [right, setRight] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);


    const executeOperation = async (data) => {
        return await axios.post(`${baseUrl}/api/v1/calculation/calculate`, data);
    }

    const calculate = () => {
        const requestData = {
            left: parseFloat(left),
            operation: operation,
            right: parseFloat(right),
        };

        executeOperation(requestData)
            .then(response => {
                const data = response.data;
                if (response.status === 200) {
                    setResult(`Result: ${data.data.result}`);
                    setError(null);
                } else {
                    setResult(null);
                    setError(`Error: ${data.detail.message}`);
                }
            }).catch(error => {
                setResult(null);
                setError(`Error: ${error.message}`);
            });
    };

    return (
        <div>
            <h1 className='title'>Calculator</h1>

            <form className='calculator'>
                <input
                    type="text"
                    value={left}
                    onChange={(e) => setLeft(e.target.value)}
                    required
                />

                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>

                <input
                    type="text"
                    value={right}
                    onChange={(e) => setRight(e.target.value)}
                    required
                />

                <button type="button" onClick={calculate}>
                    Count
                </button>
            </form>

            <h2 className='title'>{result || error}</h2>
        </div>
    );
};

export default Calculator;
