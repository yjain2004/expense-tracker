import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function EntryForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm()


    const [transactionType, setTransactionType] = useState("");
    const [categoryMode, setCategoryMode] = useState("");
    // categoryMode = "salary" | "borrowed" | "other"



    return (
        <section className="bg-white dark:bg-gray-900 w-fit rounded-2xl">
            <div className="max-w-2xl h-fit px-6 py-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add a new transaction</h2>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <input {...register("title")} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g Bought lamp from amazon" required="" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Transaction type
                            </label>
                            <select
                                {...register("type", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                onChange={(e) => {
                                    setTransactionType(e.target.value);
                                    setCategoryMode("");
                                    setValue("category", "");
                                }}
                            >
                                <option value="">Select type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {/* ================= INCOME CATEGORIES ================= */}
                        {transactionType === "income" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Income category
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    onChange={(e) => {
                                        setCategoryMode(e.target.value);

                                        if (e.target.value !== "other") {
                                            setValue("category", e.target.value);
                                        } else {
                                            setValue("category", "");
                                        }
                                    }}
                                >
                                    <option value="">Select category</option>
                                    <option value="salary">Salary</option>
                                    <option value="loan">Loan</option>
                                    <option value="borrowed">Borrowed</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        )}

                        {/* ================= EXPENSE CATEGORIES ================= */}
                        {transactionType === "expense" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Expense category
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    onChange={(e) => {
                                        setCategoryMode(e.target.value);

                                        if (e.target.value !== "other") {
                                            setValue("category", e.target.value);
                                        } else {
                                            setValue("category", "");
                                        }
                                    }}
                                >
                                    <option value="">Select category</option>
                                    <option value="grocery">Grocery</option>
                                    <option value="office-rent">Office rent</option>
                                    <option value="wifi">Office WiFi recharge</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="business">Business</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        )}

                        {/* ================= CUSTOM CATEGORY INPUT ================= */}
                        {categoryMode === "other" && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Please specify
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    onChange={(e) => setValue("category", e.target.value)}
                                />
                            </div>
                        )}

                        {/* ================= HIDDEN FINAL CATEGORY FIELD ================= */}
                        <input type="hidden" {...register("category", { required: true })} />

                        {/* ================= AMOUNT ================= */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Amount
                            </label>
                            <input
                                {...register("amount", { required: true })}
                                type="number"
                                placeholder="Enter amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>


                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 w-full justify-center cursor-pointer">
                        Add Transaction
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EntryForm
