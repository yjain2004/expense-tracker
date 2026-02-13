import { useState } from "react";

function Filters({ onApply, onRemove }) {
    const [dateRange, setDateRange] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");

    function applyFilters() {
        onApply({
            dateRange,
            type,
            category,
        });

    }


    function removeFilters(setfilters) {

        onRemove({
            dateRange: "",
            type: "",
            category: "",

        })


    }


    return (
        <div className="flex flex-wrap items-center gap-3 bg-gray-800/60 p-3 rounded-lg">
            {/* Date Range */}
            <select
                className="bg-gray-700 text-sm text-white rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
            >
                <option value="">Date Range</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
            </select>

            {/* Category Type */}
            <select
                className="bg-gray-700 text-sm text-white rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => {
                    setType(e.target.value);
                    setCategory("");
                }}
            >
                <option value="">Transaction Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            {/* Category */}
            <select
                disabled={!type}
                className={`bg-gray-700 text-sm text-white rounded-lg px-3 py-2 border border-gray-600
          ${!type ? "opacity-50 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select category</option>

                {type === "income" && (
                    <>
                        <option value="salary">Salary</option>
                        <option value="loan">Loan</option>
                        <option value="borrowed">Borrowed</option>
                    </>
                )}

                {type === "expense" && (
                    <>
                        <option value="grocery">Grocery</option>
                        <option value="office-rent">Office Rent</option>
                        <option value="wifi">Office WiFi</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="business">Business</option>
                    </>
                )}
            </select>



            {/* Filter Button */}
            <div className="flex gap-2">
                <button
                    onClick={applyFilters}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg"
                >
                    Filter
                </button>
                <button
                    onClick={removeFilters}
                    className="ml-auto bg-red-700 hover:bg-red-400 text-white text-sm px-5 py-2 rounded-lg"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

export default Filters;
