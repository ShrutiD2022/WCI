import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
import { Login } from "./Login";

describe('Test the login component', () => {

    test('render the login form with 2 button', async () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        const button = await screen.findAllByRole('button');
        expect(button).toHaveLength(2);
    });

    test('render login component in the document', () => {
        const { getByLabelText } = render(<BrowserRouter><Login /></BrowserRouter>);
        const childElement = getByLabelText("Username");
        expect(childElement).toBeInTheDocument();
    });

    test('render login component in the document', () => {
        const { getByLabelText } = render(<BrowserRouter><Login /></BrowserRouter>);
        const childElement = getByLabelText("Password");
        expect(childElement).toBeInTheDocument();
    });

    test('username should accept username', () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        const username = screen.getByPlaceholderText('Enter Username');
        userEvent.type(username, 'admin')
        expect(username.value).toMatch('admin');
    });

    test('password should have type password', () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        const password = screen.getByPlaceholderText('Enter Password');
        userEvent.type(password, 'admin')
        expect(password.value).toMatch('admin');
    });

    test('should be able to submit the form', () => {
        const { getByTestId } = render(<BrowserRouter><Login /></BrowserRouter>);
        const submitBtn = getByTestId('submit');
        const usernameValue = screen.getByPlaceholderText('Enter Username');
        const passwordValue = screen.getByPlaceholderText('Enter Password');
        userEvent.type(usernameValue, 'admin');
        userEvent.type(passwordValue, 'admin');
        userEvent.click(submitBtn)
        expect(usernameValue.value).toMatch('admin');
        expect(passwordValue.value).toMatch('admin');
    });

    test('should display error if incorrect  login credentials', () => {
        const { getByTestId, getByText} =  render(<BrowserRouter><Login /></BrowserRouter>);
        const submitBtn = getByTestId('submit')
        const usernameValue = screen.getByPlaceholderText('Enter Username');
        const passwordValue = screen.getByPlaceholderText('Enter Password');
        userEvent.type(usernameValue, 'admi');
        userEvent.type(passwordValue, '12345');
        userEvent.click(submitBtn);
        const errorMsg = getByText('Invalid Login');
        expect(errorMsg).toBeInTheDocument();
    });

    test('should be able to reset the form', () => {
        const { getByTestId } = render(<BrowserRouter><Login /></BrowserRouter>);
        const resetBtn = getByTestId('reset');
        const usernameValue = screen.getByPlaceholderText('Enter Username');
        const passwordValue = screen.getByPlaceholderText('Enter Password');
        fireEvent.click(resetBtn);
        expect(usernameValue.value).toMatch('');
        expect(passwordValue.value).toMatch('');
    })
})