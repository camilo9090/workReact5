import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } }

export type BudgetState = {

    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
}

export const initialState: BudgetState = {

    budget: 0,
    modal: false,
    expense: [],
    editingId: ''
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {

        return {

            ...state,
            modal: true
        }
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }
    const createExpense = (DraftExpense: DraftExpense): Expense => {
        return {
            ...DraftExpense,
            id: uuidv4()
        }
    }
    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expense: [...state.expense, expense]
        }
    }
    if (action.type === 'remove-expense') {

        return {
            ...state,
            expense: state.expense.filter(expenses => expenses.id !== action.payload.id)
        }
    }
    if (action.type === 'get-expense') {
        return {

            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    if (action.type === 'update-expense') {


        return {
            ...state,
            expense: state.expense.map(expenses => expenses.id === action.payload.expense.id ? action.payload.expense : expenses)
            ,modal:false,
            editingId: ''
            
        }
    }

    return state
}