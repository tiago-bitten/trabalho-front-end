import React from 'react';
import Button from "./Button";
import "../styles/SalesFilters.css";

const SalesFilters = ({ startDate, endDate, setStartDate, setEndDate, onAddSale }) => {
    return (
        <div className="filters">
            <Button type="button" onClick={onAddSale}>Nova venda</Button>
            <div className="date-filters">
                <label>
                    Data de Início:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    Data de Fim:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
            </div>
        </div>
    );
};

export default SalesFilters;
