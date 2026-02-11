import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function EntryForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    async function onSubmit(data) {
        try {
            const res = await axios.post("http://localhost:3000/api/data/create", data, { withCredentials: true })
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }
    return (
        <section class="bg-white dark:bg-gray-900 w-fit rounded-2xl">
            <div class="max-w-2xl h-fit px-6 py-6">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Add a new transaction</h2>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <input {...register("title")} type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g Bought lamp from amazon" required="" />
                        </div>
                        <div class="w-full">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input {...register("amount")} type="text" name="amount" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g Bought lamp from amazon" required="" />
                        </div>
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction type</label>
                            <select {...register("type")} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="no">Select category</option>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 w-full justify-center cursor-pointer">
                        Add Transaction
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EntryForm
